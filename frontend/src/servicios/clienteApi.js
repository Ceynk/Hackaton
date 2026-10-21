import {
  datosSaludRespaldo,
  datosCategoriasRespaldo,
  obtenerRecursosFiltradosRespaldo,
  obtenerRecursoPorIdentificadorRespaldo,
  obtenerContenidosRespaldo
} from "./datosLocalesRespaldo";

const URL_ORIGINAL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
const URL_SIN_BARRA_FINAL = URL_ORIGINAL.replace(/\/+$/, "");
const URL_BASE_API = URL_SIN_BARRA_FINAL.endsWith("/api")
  ? URL_SIN_BARRA_FINAL
  : `${URL_SIN_BARRA_FINAL}/api`;

const PATRON_TEXTO_BUSQUEDA_SEGURO = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s.,-]{1,80}$/;

export function validarTerminoBusquedaCliente(textoBusqueda) {
  const textoLimpio = typeof textoBusqueda === "string" ? textoBusqueda.trim() : "";

  if (!textoLimpio) {
    return {
      esValido: true,
      mensajeError: "",
      terminoNormalizado: ""
    };
  }

  if (textoLimpio.length > 80) {
    return {
      esValido: false,
      mensajeError:
        "Use palabras clave breves (maximo 80 caracteres). No escriba relatos personales ni informacion clinica.",
      terminoNormalizado: textoLimpio
    };
  }

  if (!PATRON_TEXTO_BUSQUEDA_SEGURO.test(textoLimpio)) {
    return {
      esValido: false,
      mensajeError:
        "El termino de busqueda solo permite letras, numeros, espacios y signos basicos de puntuacion.",
      terminoNormalizado: textoLimpio
    };
  }

  return {
    esValido: true,
    mensajeError: "",
    terminoNormalizado: textoLimpio
  };
}

function responderConDatosRespaldo(rutaEndpoint) {
  if (rutaEndpoint === "/salud") {
    return datosSaludRespaldo;
  }

  if (rutaEndpoint === "/categorias") {
    return datosCategoriasRespaldo;
  }

  if (rutaEndpoint.startsWith("/recursos/")) {
    const partesRuta = rutaEndpoint.split("/");
    const idRecurso = partesRuta[2];
    const respuestaDetalle = obtenerRecursoPorIdentificadorRespaldo(idRecurso);
    if (!respuestaDetalle) {
      throw new Error("Recurso no encontrado en el directorio.");
    }
    return respuestaDetalle;
  }

  if (rutaEndpoint.startsWith("/recursos")) {
    const indiceSigno = rutaEndpoint.indexOf("?");
    const cadenaConsulta = indiceSigno !== -1 ? rutaEndpoint.slice(indiceSigno + 1) : "";
    const parametrosConsulta = new URLSearchParams(cadenaConsulta);
    const filtros = {
      categoria: parametrosConsulta.get("categoria") || "",
      modalidad: parametrosConsulta.get("modalidad") || "",
      tipoServicio: parametrosConsulta.get("tipoServicio") || "",
      busqueda: parametrosConsulta.get("busqueda") || "",
      soloAtencionInmediata: parametrosConsulta.get("soloAtencionInmediata") || ""
    };
    return obtenerRecursosFiltradosRespaldo(filtros);
  }

  if (rutaEndpoint.startsWith("/contenidos-bienestar")) {
    const indiceSigno = rutaEndpoint.indexOf("?");
    const cadenaConsulta = indiceSigno !== -1 ? rutaEndpoint.slice(indiceSigno + 1) : "";
    const parametrosConsulta = new URLSearchParams(cadenaConsulta);
    const ejeTematico = parametrosConsulta.get("ejeTematico") || "";
    return obtenerContenidosRespaldo(ejeTematico);
  }

  throw new Error("Ruta no reconocida.");
}

async function realizarSolicitudGet(rutaEndpoint) {
  const urlRelativa = `/api${rutaEndpoint}`;
  const urlAbsoluta = `${URL_BASE_API}${rutaEndpoint}`;

  try {
    const respuestaHttp = await fetch(urlRelativa, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    });

    if (respuestaHttp.ok) {
      const cuerpoRespuesta = await respuestaHttp.json();
      if (cuerpoRespuesta && cuerpoRespuesta.exito) {
        return cuerpoRespuesta;
      }
    }
  } catch (errorRelativo) {
  }

  try {
    const respuestaDirecta = await fetch(urlAbsoluta, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    });

    if (respuestaDirecta.ok) {
      const cuerpoDirecto = await respuestaDirecta.json();
      if (cuerpoDirecto && cuerpoDirecto.exito) {
        return cuerpoDirecto;
      }
    }
  } catch (errorDirecto) {
  }

  return responderConDatosRespaldo(rutaEndpoint);
}

export async function obtenerEstadoSalud() {
  return realizarSolicitudGet("/salud");
}

export async function obtenerCategorias() {
  return realizarSolicitudGet("/categorias");
}

export async function obtenerRecursos(filtros = {}) {
  const parametrosUrl = new URLSearchParams();

  if (filtros.categoria) {
    parametrosUrl.set("categoria", filtros.categoria);
  }
  if (filtros.modalidad) {
    parametrosUrl.set("modalidad", filtros.modalidad);
  }
  if (filtros.tipoServicio) {
    parametrosUrl.set("tipoServicio", filtros.tipoServicio);
  }
  if (filtros.busqueda) {
    parametrosUrl.set("busqueda", filtros.busqueda);
  }
  if (filtros.soloAtencionInmediata) {
    parametrosUrl.set("soloAtencionInmediata", "true");
  }

  const cadenaConsulta = parametrosUrl.toString();
  const rutaFinal = cadenaConsulta ? `/recursos?${cadenaConsulta}` : "/recursos";
  return realizarSolicitudGet(rutaFinal);
}

export async function obtenerDetalleRecurso(identificadorRecurso) {
  return realizarSolicitudGet(`/recursos/${encodeURIComponent(identificadorRecurso)}`);
}

export async function obtenerContenidosBienestar(ejeTematico = "") {
  const parametrosUrl = new URLSearchParams();
  if (ejeTematico) {
    parametrosUrl.set("ejeTematico", ejeTematico);
  }
  const cadenaConsulta = parametrosUrl.toString();
  const rutaFinal = cadenaConsulta
    ? `/contenidos-bienestar?${cadenaConsulta}`
    : "/contenidos-bienestar";
  return realizarSolicitudGet(rutaFinal);
}
