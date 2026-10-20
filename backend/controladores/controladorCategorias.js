const consultasCategorias = require("../consultas/consultasCategorias");
const {
  MODALIDADES_PERMITIDAS,
  TIPOS_SERVICIO_PERMITIDOS
} = require("../validaciones/validarSolicitud");

async function listarCategorias(solicitud, respuesta, siguiente) {
  try {
    const listaCategorias = await consultasCategorias.obtenerCategoriasConConteo();
    return respuesta.status(200).json({
      exito: true,
      total: listaCategorias.length,
      categorias: listaCategorias,
      filtrosDisponibles: {
        modalidades: MODALIDADES_PERMITIDAS,
        tiposServicio: TIPOS_SERVICIO_PERMITIDOS
      }
    });
  } catch (error) {
    return siguiente(error);
  }
}

module.exports = {
  listarCategorias
};
