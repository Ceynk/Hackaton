const URL_BASE_API =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

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

async function realizarSolicitudGet(rutaEndpoint) {
  let respuestaHttp;

  try {
    respuestaHttp = await fetch(`${URL_BASE_API}${rutaEndpoint}`, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    });
  } catch (errorRed) {
    throw new Error(
      "No fue posible conectar con el servidor API en Express. Verifique que el backend este en ejecucion."
    );
  }

  let cuerpoRespuesta = null;
  try {
    cuerpoRespuesta = await respuestaHttp.json();
  } catch (errorFormato) {
    throw new Error("El servidor devolvio una respuesta con formato invalido.");
  }

  if (!respuestaHttp.ok || !cuerpoRespuesta?.exito) {
    const detalleError =
      Array.isArray(cuerpoRespuesta?.errores) && cuerpoRespuesta.errores.length > 0
        ? cuerpoRespuesta.errores.join(" ")
        : cuerpoRespuesta?.mensaje || "Error al consultar la API.";
    throw new Error(detalleError);
  }

  return cuerpoRespuesta;
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
