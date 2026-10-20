import { useEffect } from "react";

export default function ModalDetalleRecurso({
  recursoDetalle,
  cargandoDetalle,
  errorDetalle,
  alCerrarModal
}) {
  useEffect(() => {
    function manejarTeclaEscape(evento) {
      if (evento.key === "Escape") {
        alCerrarModal();
      }
    }

    if (recursoDetalle || cargandoDetalle || errorDetalle) {
      window.addEventListener("keydown", manejarTeclaEscape);
    }

    return () => {
      window.removeEventListener("keydown", manejarTeclaEscape);
    };
  }, [recursoDetalle, cargandoDetalle, errorDetalle, alCerrarModal]);

  if (!recursoDetalle && !cargandoDetalle && !errorDetalle) {
    return null;
  }

  return (
    <div
      className="fondo-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-modal-detalle"
      onClick={alCerrarModal}
    >
      <div
        className="contenedor-modal"
        onClick={(evento) => evento.stopPropagation()}
      >
        <div className="encabezado-modal">
          <div>
            <p className="subtitulo-modal">
              Ficha tecnica de trazabilidad institucional
            </p>
            <h2 id="titulo-modal-detalle" className="titulo-modal">
              {cargandoDetalle
                ? "Consultando detalle del recurso..."
                : recursoDetalle?.nombre_servicio || "Detalle del recurso"}
            </h2>
          </div>
          <button
            type="button"
            className="boton-cerrar-modal"
            onClick={alCerrarModal}
            aria-label="Cerrar ventana de detalle del recurso"
          >
            Cerrar
          </button>
        </div>

        {cargandoDetalle && (
          <div className="estado-informativo" role="status">
            Recuperando informacion completa desde PostgreSQL...
          </div>
        )}

        {!cargandoDetalle && errorDetalle && (
          <div className="estado-error" role="alert">
            <p>{errorDetalle}</p>
          </div>
        )}

        {!cargandoDetalle && !errorDetalle && recursoDetalle && (
          <div className="cuerpo-modal">
            <div className="aviso-transparencia-modal">
              <strong>Nota de transparencia del registro ({recursoDetalle.codigo_recurso}):</strong>{" "}
              {recursoDetalle.nota_transparencia}
            </div>

            <p className="descripcion-modal">{recursoDetalle.descripcion}</p>

            <dl className="rejilla-detalle-modal">
              <div className="item-detalle-modal">
                <dt>Institucion responsable</dt>
                <dd>{recursoDetalle.institucion_responsable}</dd>
              </div>
              <div className="item-detalle-modal">
                <dt>Categoria de apoyo</dt>
                <dd>{recursoDetalle.categoria_nombre}</dd>
              </div>
              <div className="item-detalle-modal">
                <dt>Tipo de servicio</dt>
                <dd>{recursoDetalle.tipo_servicio}</dd>
              </div>
              <div className="item-detalle-modal">
                <dt>Modalidad de atencion</dt>
                <dd>{recursoDetalle.modalidad_atencion}</dd>
              </div>
              <div className="item-detalle-modal">
                <dt>Poblacion atendida</dt>
                <dd>{recursoDetalle.poblacion_atendida}</dd>
              </div>
              <div className="item-detalle-modal">
                <dt>Territorio y cobertura</dt>
                <dd>{recursoDetalle.territorio_cobertura}</dd>
              </div>
              <div className="item-detalle-modal">
                <dt>Medio de contacto registrado</dt>
                <dd>{recursoDetalle.medio_contacto}</dd>
              </div>
              <div className="item-detalle-modal">
                <dt>Horario de atencion</dt>
                <dd>{recursoDetalle.horario_atencion}</dd>
              </div>
              <div className="item-detalle-modal item-detalle-ancho">
                <dt>Condiciones de acceso</dt>
                <dd>{recursoDetalle.condiciones_acceso}</dd>
              </div>
              <div className="item-detalle-modal">
                <dt>Estado de verificacion</dt>
                <dd>{recursoDetalle.estado_verificacion}</dd>
              </div>
              <div className="item-detalle-modal">
                <dt>Fecha de consulta documental</dt>
                <dd>{recursoDetalle.fecha_consulta}</dd>
              </div>
              <div className="item-detalle-modal item-detalle-ancho">
                <dt>Fuente de verificacion</dt>
                <dd>{recursoDetalle.fuente_verificacion}</dd>
              </div>
            </dl>

            <div className="pie-modal">
              {recursoDetalle.url_oficial && (
                <a
                  href={recursoDetalle.url_oficial}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="boton-primario"
                >
                  Abrir URL oficial de referencia ({recursoDetalle.url_oficial})
                </a>
              )}
              <button
                type="button"
                className="boton-secundario"
                onClick={alCerrarModal}
              >
                Volver al directorio
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
