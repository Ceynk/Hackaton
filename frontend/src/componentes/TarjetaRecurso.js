export default function TarjetaRecurso({ recurso, alSeleccionarRecurso }) {
  return (
    <article
      className={`tarjeta-recurso ${recurso.es_atencion_inmediata ? "tarjeta-recurso-urgencia" : ""}`}
      aria-labelledby={`titulo-recurso-${recurso.id}`}
    >
      <div className="encabezado-tarjeta-recurso">
        <div className="grupo-etiquetas-recurso">
          <span className="etiqueta-categoria">{recurso.categoria_nombre}</span>
          <span className="etiqueta-modalidad">{recurso.modalidad_atencion}</span>
          {recurso.es_atencion_inmediata && (
            <span className="etiqueta-urgencia">Protocolo de urgencia</span>
          )}
        </div>
        <div className="grupo-etiquetas-verificacion">
          <span className="insignia-verificado">
            Verificado en entorno controlado
          </span>
          {recurso.es_dato_ficticio && (
            <span className="insignia-ficticio">
              Dato sintetico
            </span>
          )}
        </div>
      </div>

      <h3 id={`titulo-recurso-${recurso.id}`} className="titulo-tarjeta-recurso">
        {recurso.nombre_servicio}
      </h3>
      <p className="institucion-recurso">
        <strong>Institucion responsable:</strong> {recurso.institucion_responsable}
      </p>
      <p className="descripcion-recurso">{recurso.descripcion}</p>

      <dl className="lista-metadatos-recurso">
        <div className="item-metadato">
          <dt>Tipo de servicio</dt>
          <dd>{recurso.tipo_servicio}</dd>
        </div>
        <div className="item-metadato">
          <dt>Poblacion atendida</dt>
          <dd>{recurso.poblacion_atendida}</dd>
        </div>
        <div className="item-metadato">
          <dt>Territorio</dt>
          <dd>{recurso.territorio_cobertura}</dd>
        </div>
        <div className="item-metadato">
          <dt>Medio de contacto</dt>
          <dd>{recurso.medio_contacto}</dd>
        </div>
        <div className="item-metadato">
          <dt>Horario</dt>
          <dd>{recurso.horario_atencion}</dd>
        </div>
        <div className="item-metadato">
          <dt>Condiciones de acceso</dt>
          <dd>{recurso.condiciones_acceso}</dd>
        </div>
      </dl>

      <div className="bloque-trazabilidad-recurso">
        <p>
          <strong>Fuente de verificacion:</strong> {recurso.fuente_verificacion}
        </p>
        <p>
          <strong>Fecha de consulta:</strong> {recurso.fecha_consulta} |{" "}
          <strong>Codigo:</strong> {recurso.codigo_recurso}
        </p>
      </div>

      <footer className="acciones-tarjeta-recurso">
        <button
          type="button"
          className="boton-primario boton-detalle-recurso"
          onClick={() => alSeleccionarRecurso(recurso.id)}
        >
          Ver ficha completa y verificacion
        </button>
        {recurso.url_oficial && (
          <a
            href={recurso.url_oficial}
            target="_blank"
            rel="noopener noreferrer"
            className="boton-secundario enlace-fuente-oficial"
          >
            Portal institucional de referencia
          </a>
        )}
      </footer>
    </article>
  );
}
