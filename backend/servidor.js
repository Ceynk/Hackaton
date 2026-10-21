const aplicacion = require("./aplicacion");
const configuracionEntorno = require("./configuracion/entorno");
const conexionBaseDatos = require("./configuracion/baseDatos");

async function iniciarServidor() {
  try {
    await conexionBaseDatos.inicializarEsquemaYDatos();
    const estadoInicial = await conexionBaseDatos.obtenerEstadoBaseDatos();

    aplicacion.listen(configuracionEntorno.puertoBackend, "0.0.0.0", () => {
      process.stdout.write(
        `Servidor Express activo en el puerto ${configuracionEntorno.puertoBackend} (${estadoInicial.motor})\n`
      );
    });
  } catch (errorInicio) {
    process.stderr.write(
      "Error al inicializar el servidor o la conexion con PostgreSQL. Revise la configuracion de variables de entorno.\n"
    );
    process.exit(1);
  }
}

iniciarServidor();
