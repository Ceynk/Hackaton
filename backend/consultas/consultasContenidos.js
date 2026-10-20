const conexionBaseDatos = require("../configuracion/baseDatos");

async function obtenerContenidosBienestar(ejeTematico = null) {
  const parametros = [];
  let condicionFiltro = "";

  if (ejeTematico) {
    parametros.push(ejeTematico);
    condicionFiltro = "WHERE eje_tematico = $1";
  }

  const textoConsulta = `
    SELECT
      id,
      codigo,
      titulo,
      eje_tematico,
      resumen,
      recomendaciones_practicas,
      senales_buscar_apoyo,
      limitacion_alcance,
      fuente_referencia,
      es_dato_ficticio,
      orden_visual
    FROM contenidos_bienestar
    ${condicionFiltro}
    ORDER BY orden_visual ASC, id ASC
  `;

  const resultadoConsulta = await conexionBaseDatos.ejecutarConsulta(textoConsulta, parametros);
  return resultadoConsulta.rows;
}

module.exports = {
  obtenerContenidosBienestar
};
