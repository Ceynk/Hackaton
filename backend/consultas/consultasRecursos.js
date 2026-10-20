const conexionBaseDatos = require("../configuracion/baseDatos");

async function buscarRutasApoyo(filtros = {}) {
  const parametros = ["verificado_entorno_controlado"];
  const condicionesSql = ["r.estado_verificacion = $1"];

  if (filtros.categoria) {
    parametros.push(filtros.categoria);
    condicionesSql.push(`c.codigo = $${parametros.length}`);
  }

  if (filtros.modalidad) {
    parametros.push(filtros.modalidad);
    condicionesSql.push(`r.modalidad_atencion = $${parametros.length}`);
  }

  if (filtros.tipoServicio) {
    parametros.push(filtros.tipoServicio);
    condicionesSql.push(`r.tipo_servicio = $${parametros.length}`);
  }

  if (filtros.soloAtencionInmediata) {
    parametros.push(true);
    condicionesSql.push(`r.es_atencion_inmediata = $${parametros.length}`);
  }

  if (filtros.busqueda) {
    parametros.push(`%${filtros.busqueda}%`);
    const posicionParametro = parametros.length;
    condicionesSql.push(
      `(r.nombre_servicio ILIKE $${posicionParametro} OR r.institucion_responsable ILIKE $${posicionParametro} OR r.descripcion ILIKE $${posicionParametro} OR r.poblacion_atendida ILIKE $${posicionParametro})`
    );
  }

  const clausulaWhere = condicionesSql.join(" AND ");

  const textoConsulta = `
    SELECT
      r.id,
      r.codigo_recurso,
      r.nombre_servicio,
      r.institucion_responsable,
      r.descripcion,
      r.tipo_servicio,
      r.modalidad_atencion,
      r.poblacion_atendida,
      r.territorio_cobertura,
      r.medio_contacto,
      r.horario_atencion,
      r.condiciones_acceso,
      r.url_oficial,
      r.fuente_verificacion,
      TO_CHAR(r.fecha_consulta, 'YYYY-MM-DD') AS fecha_consulta,
      r.estado_verificacion,
      r.es_dato_ficticio,
      r.es_atencion_inmediata,
      r.nota_transparencia,
      c.codigo AS categoria_codigo,
      c.nombre AS categoria_nombre
    FROM recursos_apoyo r
    INNER JOIN categorias_apoyo c ON c.id = r.categoria_id
    WHERE ${clausulaWhere}
    ORDER BY r.es_atencion_inmediata DESC, c.orden_visual ASC, r.nombre_servicio ASC
  `;

  const resultadoConsulta = await conexionBaseDatos.ejecutarConsulta(textoConsulta, parametros);
  return resultadoConsulta.rows;
}

async function obtenerRecursoVerificadoPorId(identificadorRecurso) {
  const textoConsulta = `
    SELECT
      r.id,
      r.codigo_recurso,
      r.nombre_servicio,
      r.institucion_responsable,
      r.descripcion,
      r.tipo_servicio,
      r.modalidad_atencion,
      r.poblacion_atendida,
      r.territorio_cobertura,
      r.medio_contacto,
      r.horario_atencion,
      r.condiciones_acceso,
      r.url_oficial,
      r.fuente_verificacion,
      TO_CHAR(r.fecha_consulta, 'YYYY-MM-DD') AS fecha_consulta,
      r.estado_verificacion,
      r.es_dato_ficticio,
      r.es_atencion_inmediata,
      r.nota_transparencia,
      c.codigo AS categoria_codigo,
      c.nombre AS categoria_nombre
    FROM recursos_apoyo r
    INNER JOIN categorias_apoyo c ON c.id = r.categoria_id
    WHERE r.id = $1
      AND r.estado_verificacion = $2
    LIMIT 1
  `;

  const resultadoConsulta = await conexionBaseDatos.ejecutarConsulta(textoConsulta, [
    identificadorRecurso,
    "verificado_entorno_controlado"
  ]);

  return resultadoConsulta.rows[0] || null;
}

async function obtenerResumenTransparenciaRecursos() {
  const consultaConteo = `
    SELECT
      estado_verificacion,
      COUNT(*)::int AS cantidad
    FROM recursos_apoyo
    GROUP BY estado_verificacion
  `;

  const consultaPendientes = `
    SELECT
      r.id,
      r.codigo_recurso,
      r.nombre_servicio,
      r.institucion_responsable,
      r.territorio_cobertura,
      r.estado_verificacion,
      r.fuente_verificacion,
      r.es_dato_ficticio,
      r.nota_transparencia,
      c.nombre AS categoria_nombre
    FROM recursos_apoyo r
    INNER JOIN categorias_apoyo c ON c.id = r.categoria_id
    WHERE r.estado_verificacion = $1
    ORDER BY r.codigo_recurso ASC
  `;

  const resultadoConteo = await conexionBaseDatos.ejecutarConsulta(consultaConteo, []);
  const resultadoPendientes = await conexionBaseDatos.ejecutarConsulta(consultaPendientes, [
    "pendiente_verificacion"
  ]);

  return {
    conteoPorEstado: resultadoConteo.rows,
    recursosRetenidosPorVerificacion: resultadoPendientes.rows
  };
}

module.exports = {
  buscarRutasApoyo,
  obtenerRecursoVerificadoPorId,
  obtenerResumenTransparenciaRecursos
};
