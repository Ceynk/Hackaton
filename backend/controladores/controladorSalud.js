const conexionBaseDatos = require("../configuracion/baseDatos");

async function consultarEstadoSistema(solicitud, respuesta, siguiente) {
  try {
    const estadoBaseDatos = await conexionBaseDatos.obtenerEstadoBaseDatos();
    return respuesta.status(200).json({
      exito: true,
      proyecto: "Mente Sana Joven",
      nivelMadurez: "Prototipo integrado y validado en entorno controlado",
      salvaguardasActivas: {
        sinDiagnosticoClinico: true,
        sinRecoleccionDatosPersonales: true,
        soloRecursosVerificadosEnDirectorio: true,
        datosDemostracionIdentificadosComoFicticios: true
      },
      baseDatos: estadoBaseDatos
    });
  } catch (error) {
    return siguiente(error);
  }
}

module.exports = {
  consultarEstadoSistema
};
