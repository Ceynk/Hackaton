const conexionBaseDatos = require("../configuracion/baseDatos");

async function ejecutarInicializacion() {
  try {
    const resultadoInicializacion = await conexionBaseDatos.inicializarEsquemaYDatos();
    const estadoActual = await conexionBaseDatos.obtenerEstadoBaseDatos();

    process.stdout.write(
      `Esquema y datos semilla cargados correctamente en ${resultadoInicializacion.motorActivo}. Recursos verificados activos: ${estadoActual.recursosVerificados}.\n`
    );

    await conexionBaseDatos.cerrarConexionBaseDatos();
    process.exit(0);
  } catch (errorInicializacion) {
    process.stderr.write(
      "No fue posible inicializar el esquema y los datos semilla en la base de datos.\n"
    );
    await conexionBaseDatos.cerrarConexionBaseDatos();
    process.exit(1);
  }
}

ejecutarInicializacion();
