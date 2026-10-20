const conexionBaseDatos = require("../configuracion/baseDatos");

async function obtenerCategoriasConConteo() {
  const textoConsulta = `
    SELECT
      c.id,
      c.codigo,
      c.nombre,
      c.descripcion,
      c.orden_visual,
      COUNT(r.id)::int AS total_recursos_verificados
    FROM categorias_apoyo c
    LEFT JOIN recursos_apoyo r
      ON r.categoria_id = c.id
      AND r.estado_verificacion = $1
    GROUP BY c.id, c.codigo, c.nombre, c.descripcion, c.orden_visual
    ORDER BY c.orden_visual ASC, c.nombre ASC
  `;

  const resultadoConsulta = await conexionBaseDatos.ejecutarConsulta(textoConsulta, [
    "verificado_entorno_controlado"
  ]);
  return resultadoConsulta.rows;
}

module.exports = {
  obtenerCategoriasConConteo
};
