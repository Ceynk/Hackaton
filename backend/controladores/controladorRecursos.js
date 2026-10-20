const consultasRecursos = require("../consultas/consultasRecursos");
const {
  validarFiltrosRecursos,
  validarIdentificadorNumerico
} = require("../validaciones/validarSolicitud");

async function listarRecursos(solicitud, respuesta, siguiente) {
  try {
    const validacion = validarFiltrosRecursos(solicitud.query);

    if (!validacion.esValido) {
      return respuesta.status(400).json({
        exito: false,
        mensaje: "Los parametros de filtrado enviados no son validos.",
        errores: validacion.errores
      });
    }

    const listaRecursos = await consultasRecursos.buscarRutasApoyo(
      validacion.filtrosNormalizados
    );

    return respuesta.status(200).json({
      exito: true,
      total: listaRecursos.length,
      filtrosAplicados: validacion.filtrosNormalizados,
      avisoUsoResponsable:
        "Este directorio publica unicamente registros en estado verificado_entorno_controlado. Los datos actuales son sinteticos para demostracion y no sustituyen atencion profesional.",
      recursos: listaRecursos
    });
  } catch (error) {
    return siguiente(error);
  }
}

async function obtenerDetalleRecurso(solicitud, respuesta, siguiente) {
  try {
    const validacionId = validarIdentificadorNumerico(solicitud.params.id);

    if (!validacionId.esValido) {
      return respuesta.status(400).json({
        exito: false,
        mensaje: validacionId.error
      });
    }

    const recursoEncontrado = await consultasRecursos.obtenerRecursoVerificadoPorId(
      validacionId.identificador
    );

    if (!recursoEncontrado) {
      return respuesta.status(404).json({
        exito: false,
        mensaje:
          "El recurso solicitado no existe o no cuenta con estado de verificacion activo para publicacion."
      });
    }

    return respuesta.status(200).json({
      exito: true,
      recurso: recursoEncontrado
    });
  } catch (error) {
    return siguiente(error);
  }
}

async function obtenerAuditoriaVerificacion(solicitud, respuesta, siguiente) {
  try {
    const resumenTransparencia = await consultasRecursos.obtenerResumenTransparenciaRecursos();
    return respuesta.status(200).json({
      exito: true,
      politicaVerificacion:
        "Ningun recurso con estado pendiente_verificacion se incluye en el directorio publico activo. Las lineas o servicios sin comprobacion territorial vigente permanecen retenidos.",
      resumen: resumenTransparencia
    });
  } catch (error) {
    return siguiente(error);
  }
}

module.exports = {
  listarRecursos,
  obtenerDetalleRecurso,
  obtenerAuditoriaVerificacion
};
