const consultasContenidos = require("../consultas/consultasContenidos");
const {
  EJES_TEMATICOS_PERMITIDOS,
  validarFiltroContenidos
} = require("../validaciones/validarSolicitud");

async function listarContenidosBienestar(solicitud, respuesta, siguiente) {
  try {
    const validacion = validarFiltroContenidos(solicitud.query);

    if (!validacion.esValido) {
      return respuesta.status(400).json({
        exito: false,
        mensaje: validacion.error
      });
    }

    const listaContenidos = await consultasContenidos.obtenerContenidosBienestar(
      validacion.ejeTematico
    );

    return respuesta.status(200).json({
      exito: true,
      total: listaContenidos.length,
      ejeTematicoAplicado: validacion.ejeTematico,
      ejesTematicosDisponibles: EJES_TEMATICOS_PERMITIDOS,
      contenidos: listaContenidos
    });
  } catch (error) {
    return siguiente(error);
  }
}

module.exports = {
  listarContenidosBienestar
};
