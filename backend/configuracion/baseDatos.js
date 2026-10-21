const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");
const configuracionEntorno = require("./entorno");

const poolPostgres = new Pool(configuracionEntorno.baseDatos);

let instanciaPostgresEmbebida = null;
let motorActivo = "postgres_pool";
let inicializacionCompletada = false;

async function leerArchivoSql(nombreArchivo) {
  const rutasPosibles = [
    path.resolve(__dirname, "../base_datos", nombreArchivo),
    path.resolve(__dirname, "../../base_datos", nombreArchivo),
    path.resolve(process.cwd(), "base_datos", nombreArchivo),
    path.resolve(process.cwd(), "../base_datos", nombreArchivo)
  ];

  for (const ruta of rutasPosibles) {
    if (fs.existsSync(ruta)) {
      return fs.promises.readFile(ruta, "utf8");
    }
  }

  return fs.promises.readFile(rutasPosibles[0], "utf8");
}

async function obtenerMotorEmbebido() {
  if (instanciaPostgresEmbebida) {
    return instanciaPostgresEmbebida;
  }

  const { PGlite } = await import("@electric-sql/pglite");
  const directorioDatos =
    process.env.MODO_PRUEBA === "memoria"
      ? undefined
      : path.resolve(__dirname, "../../datos_locales_pg");

  instanciaPostgresEmbebida = new PGlite(directorioDatos);
  await instanciaPostgresEmbebida.waitReady;

  const sqlEsquema = await leerArchivoSql("esquema.sql");
  const sqlSemilla = await leerArchivoSql("datos_semilla.sql");
  await instanciaPostgresEmbebida.exec(sqlEsquema);
  await instanciaPostgresEmbebida.exec(sqlSemilla);

  motorActivo = "postgresql_embebido_pglite";
  inicializacionCompletada = true;
  return instanciaPostgresEmbebida;
}

async function resolverConexionBaseDatos() {
  if (configuracionEntorno.modoBaseDatos === "embebido") {
    return obtenerMotorEmbebido();
  }

  if (instanciaPostgresEmbebida) {
    return instanciaPostgresEmbebida;
  }

  try {
    const clientePrueba = await poolPostgres.connect();
    clientePrueba.release();
    motorActivo = "postgresql_servidor_pg";
    return poolPostgres;
  } catch (errorConexion) {
    if (configuracionEntorno.modoBaseDatos === "postgres") {
      throw errorConexion;
    }
    return obtenerMotorEmbebido();
  }
}

async function ejecutarConsulta(textoConsulta, parametros = []) {
  if (typeof textoConsulta !== "string" || textoConsulta.trim().length === 0) {
    throw new Error("La consulta SQL debe ser una cadena de texto valida.");
  }

  if (!Array.isArray(parametros)) {
    throw new Error("Los parametros de la consulta SQL deben enviarse en un arreglo.");
  }

  const conexionActiva = await resolverConexionBaseDatos();
  return conexionActiva.query(textoConsulta, parametros);
}

async function inicializarEsquemaYDatos() {
  const sqlEsquema = await leerArchivoSql("esquema.sql");
  const sqlSemilla = await leerArchivoSql("datos_semilla.sql");
  const conexionActiva = await resolverConexionBaseDatos();

  if (typeof conexionActiva.exec === "function") {
    await conexionActiva.exec(sqlEsquema);
    await conexionActiva.exec(sqlSemilla);
  } else {
    await conexionActiva.query(sqlEsquema);
    await conexionActiva.query(sqlSemilla);
  }

  inicializacionCompletada = true;
  return {
    motorActivo,
    inicializacionCompletada
  };
}

async function obtenerEstadoBaseDatos() {
  const resultadoVerificacion = await ejecutarConsulta(
    "SELECT COUNT(*)::int AS total_recursos FROM recursos_apoyo WHERE estado_verificacion = $1",
    ["verificado_entorno_controlado"]
  );

  return {
    conectado: true,
    motor: motorActivo,
    recursosVerificados: resultadoVerificacion.rows[0]?.total_recursos ?? 0
  };
}

async function cerrarConexionBaseDatos() {
  if (instanciaPostgresEmbebida && typeof instanciaPostgresEmbebida.close === "function") {
    await instanciaPostgresEmbebida.close();
    instanciaPostgresEmbebida = null;
  }
  await poolPostgres.end().catch(() => {});
}

const conexionBaseDatos = {
  ejecutarConsulta,
  inicializarEsquemaYDatos,
  obtenerEstadoBaseDatos,
  cerrarConexionBaseDatos
};

module.exports = conexionBaseDatos;
