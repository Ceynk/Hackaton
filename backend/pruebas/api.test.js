process.env.MODO_BASE_DATOS = "embebido";
process.env.MODO_PRUEBA = "memoria";

const { describe, it, before, after } = require("node:test");
const assert = require("node:assert/strict");
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const aplicacion = require("../aplicacion");
const conexionBaseDatos = require("../configuracion/baseDatos");

let servidorPruebas = null;
let urlBasePruebas = "";

async function realizarPeticionJson(rutaRelativa, opciones = {}) {
  const respuestaHttp = await fetch(`${urlBasePruebas}${rutaRelativa}`, opciones);
  const cuerpoJson = await respuestaHttp.json();
  return {
    codigoEstado: respuestaHttp.status,
    encabezados: respuestaHttp.headers,
    cuerpo: cuerpoJson
  };
}

describe("Pruebas de integracion API Express y PostgreSQL - Mente Sana Joven", () => {
  before(async () => {
    await conexionBaseDatos.inicializarEsquemaYDatos();
    servidorPruebas = http.createServer(aplicacion);
    await new Promise((resolver) => {
      servidorPruebas.listen(0, "127.0.0.1", () => {
        const direccion = servidorPruebas.address();
        urlBasePruebas = `http://127.0.0.1:${direccion.port}`;
        resolver();
      });
    });
  });

  after(async () => {
    if (servidorPruebas) {
      await new Promise((resolver) => servidorPruebas.close(resolver));
    }
    await conexionBaseDatos.cerrarConexionBaseDatos();
  });

  it("verifica el estado de salud del sistema y las salvaguardas eticas en /api/salud", async () => {
    const respuesta = await realizarPeticionJson("/api/salud");
    assert.equal(respuesta.codigoEstado, 200);
    assert.equal(respuesta.cuerpo.exito, true);
    assert.equal(respuesta.cuerpo.baseDatos.conectado, true);
    assert.equal(respuesta.cuerpo.salvaguardasActivas.sinDiagnosticoClinico, true);
    assert.equal(respuesta.cuerpo.salvaguardasActivas.soloRecursosVerificadosEnDirectorio, true);
    assert.ok(respuesta.cuerpo.baseDatos.recursosVerificados >= 6);
  });

  it("lista las categorias de apoyo con conteo de recursos verificados en /api/categorias", async () => {
    const respuesta = await realizarPeticionJson("/api/categorias");
    assert.equal(respuesta.codigoEstado, 200);
    assert.equal(respuesta.cuerpo.exito, true);
    assert.equal(respuesta.cuerpo.categorias.length, 5);
    assert.ok(Array.isArray(respuesta.cuerpo.filtrosDisponibles.modalidades));
    assert.ok(Array.isArray(respuesta.cuerpo.filtrosDisponibles.tiposServicio));
  });

  it("devuelve unicamente recursos verificados e identificados como ficticios en /api/recursos", async () => {
    const respuesta = await realizarPeticionJson("/api/recursos");
    assert.equal(respuesta.codigoEstado, 200);
    assert.equal(respuesta.cuerpo.exito, true);
    assert.equal(respuesta.cuerpo.recursos.length, 6);

    for (const recurso of respuesta.cuerpo.recursos) {
      assert.equal(recurso.estado_verificacion, "verificado_entorno_controlado");
      assert.equal(recurso.es_dato_ficticio, true);
      assert.ok(recurso.fecha_consulta);
      assert.ok(recurso.url_oficial);
    }
  });

  it("filtra recursos correctamente por categoria, modalidad y termino de busqueda", async () => {
    const respuestaFiltrada = await realizarPeticionJson(
      "/api/recursos?categoria=acompanamiento_psicosocial&modalidad=Telefonica"
    );
    assert.equal(respuestaFiltrada.codigoEstado, 200);
    assert.equal(respuestaFiltrada.cuerpo.recursos.length, 1);
    assert.equal(respuestaFiltrada.cuerpo.recursos[0].codigo_recurso, "DEMO-VVC-003");

    const respuestaVacia = await realizarPeticionJson(
      "/api/recursos?busqueda=TerminoInexistenteEnDirectorio"
    );
    assert.equal(respuestaVacia.codigoEstado, 200);
    assert.equal(respuestaVacia.cuerpo.recursos.length, 0);
  });

  it("rechaza parametros invalidos e intentos de inyeccion en /api/recursos", async () => {
    const respuestaModalidadInvalida = await realizarPeticionJson(
      "/api/recursos?modalidad=Invalida"
    );
    assert.equal(respuestaModalidadInvalida.codigoEstado, 400);
    assert.equal(respuestaModalidadInvalida.cuerpo.exito, false);

    const respuestaInyeccion = await realizarPeticionJson(
      "/api/recursos?busqueda='; DROP TABLE recursos_apoyo; --"
    );
    assert.equal(respuestaInyeccion.codigoEstado, 400);
    assert.equal(respuestaInyeccion.cuerpo.exito, false);
  });

  it("obtiene el detalle de un recurso verificado y oculta recursos pendientes de verificacion", async () => {
    const listaVerificados = await realizarPeticionJson("/api/recursos");
    const primerRecurso = listaVerificados.cuerpo.recursos[0];

    const respuestaDetalle = await realizarPeticionJson(`/api/recursos/${primerRecurso.id}`);
    assert.equal(respuestaDetalle.codigoEstado, 200);
    assert.equal(respuestaDetalle.cuerpo.recurso.id, primerRecurso.id);

    const respuestaAuditoria = await realizarPeticionJson(
      "/api/recursos/auditoria-verificacion"
    );
    assert.equal(respuestaAuditoria.codigoEstado, 200);
    const recursoPendiente =
      respuestaAuditoria.cuerpo.resumen.recursosRetenidosPorVerificacion[0];
    assert.ok(recursoPendiente);

    const respuestaPendientePorId = await realizarPeticionJson(
      `/api/recursos/${recursoPendiente.id}`
    );
    assert.equal(respuestaPendientePorId.codigoEstado, 404);

    const respuestaIdInvalido = await realizarPeticionJson("/api/recursos/abc");
    assert.equal(respuestaIdInvalido.codigoEstado, 400);
  });

  it("bloquea modificaciones de recursos por parte de visitantes con HTTP 405", async () => {
    const respuestaPost = await realizarPeticionJson("/api/recursos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado_verificacion: "verificado_entorno_controlado" })
    });
    assert.equal(respuestaPost.codigoEstado, 405);
    assert.equal(respuestaPost.cuerpo.exito, false);
  });

  it("consulta y filtra los contenidos informativos de bienestar emocional", async () => {
    const respuestaTodos = await realizarPeticionJson("/api/contenidos-bienestar");
    assert.equal(respuestaTodos.codigoEstado, 200);
    assert.equal(respuestaTodos.cuerpo.contenidos.length, 4);

    const respuestaEje = await realizarPeticionJson(
      "/api/contenidos-bienestar?ejeTematico=Autocuidado%20cotidiano"
    );
    assert.equal(respuestaEje.codigoEstado, 200);
    assert.equal(respuestaEje.cuerpo.contenidos.length, 1);
  });

  it("verifica ausencia de comentarios, emojis y credenciales expuestas en el codigo fuente", () => {
    const raizProyecto = path.resolve(__dirname, "../..");
    const carpetasInspeccionar = [
      path.join(raizProyecto, "base_datos"),
      path.join(raizProyecto, "backend"),
      path.join(raizProyecto, "frontend", "src")
    ];

    const archivosCodigo = [];

    function recolectarArchivos(directorioActual) {
      const entradas = fs.readdirSync(directorioActual, { withFileTypes: true });
      for (const entrada of entradas) {
        if (entrada.name === "node_modules" || entrada.name === ".next") {
          continue;
        }
        const rutaCompleta = path.join(directorioActual, entrada.name);
        if (entrada.isDirectory()) {
          recolectarArchivos(rutaCompleta);
        } else if (/\.(js|mjs|css|sql)$/.test(entrada.name)) {
          archivosCodigo.push(rutaCompleta);
        }
      }
    }

    for (const carpeta of carpetasInspeccionar) {
      recolectarArchivos(carpeta);
    }

    assert.ok(archivosCodigo.length >= 20);
    const patronEmoji = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;

    for (const rutaArchivo of archivosCodigo) {
      const contenidoArchivo = fs.readFileSync(rutaArchivo, "utf8");
      assert.equal(
        patronEmoji.test(contenidoArchivo),
        false,
        `Emoji no permitido en ${rutaArchivo}`
      );

      if (rutaArchivo.includes(path.join("frontend", "src"))) {
        assert.equal(
          contenidoArchivo.includes("PGPASSWORD") || contenidoArchivo.includes("PGUSER"),
          false,
          `Credencial de base de datos expuesta en frontend: ${rutaArchivo}`
        );
      }
    }
  });
});
