import FiltrosDirectorio from "./FiltrosDirectorio";
import TarjetaRecurso from "./TarjetaRecurso";

export default function DirectorioRutasApoyo({
  categorias,
  modalidadesDisponibles,
  tiposServicioDisponibles,
  recursos,
  filtrosActivos,
  textoBusquedaTemporal,
  errorBusqueda,
  cargandoRecursos,
  errorRecursos,
  avisoUsoResponsable,
  alCambiarCampoFiltro,
  alCambiarTextoBusqueda,
  alEjecutarBusqueda,
  alLimpiarFiltros,
  alSeleccionarRecurso,
  alReintentarCarga
}) {
  return (
    <section
      id="directorio"
      className="seccion-bloque seccion-directorio"
      aria-labelledby="titulo-directorio"
    >
      <div className="contenedor-principal">
        <div className="encabezado-seccion">
          <p className="subtitulo-seccion">Rutas institucionales y comunitarias</p>
          <h2 id="titulo-directorio" className="titulo-seccion">
            Directorio de rutas de apoyo y orientacion
          </h2>
          <p className="introduccion-seccion">
            Consulte las rutas registradas distinguiendo el tipo de servicio, la institucion responsable, la modalidad de atencion, los requisitos de acceso y la fuente de verificacion. Ningun recurso sin verificacion activa se publica en este listado.
          </p>
        </div>

        <div className="aviso-entorno-controlado" role="note">
          <strong>Aviso de entorno controlado:</strong>{" "}
          {avisoUsoResponsable ||
            "Los registros de este prototipo son datos sinteticos de demostracion tecnica. No inventan ni afirman la vigencia real de lineas telefonicas sin comprobacion oficial territorial."}
        </div>

        <FiltrosDirectorio
          categorias={categorias}
          modalidadesDisponibles={modalidadesDisponibles}
          tiposServicioDisponibles={tiposServicioDisponibles}
          filtrosActivos={filtrosActivos}
          textoBusquedaTemporal={textoBusquedaTemporal}
          errorBusqueda={errorBusqueda}
          alCambiarCampoFiltro={alCambiarCampoFiltro}
          alCambiarTextoBusqueda={alCambiarTextoBusqueda}
          alEjecutarBusqueda={alEjecutarBusqueda}
          alLimpiarFiltros={alLimpiarFiltros}
        />

        <div className="barra-estado-resultados" aria-live="polite">
          {!cargandoRecursos && !errorRecursos && (
            <p className="conteo-resultados">
              Mostrando <strong>{recursos.length}</strong>{" "}
              {recursos.length === 1
                ? "recurso verificado en entorno controlado"
                : "recursos verificados en entorno controlado"}
            </p>
          )}
        </div>

        {cargandoRecursos && (
          <div className="estado-informativo" role="status" aria-live="polite">
            Consultando directorio en PostgreSQL a traves de la API Express...
          </div>
        )}

        {!cargandoRecursos && errorRecursos && (
          <div className="estado-error" role="alert">
            <p className="titulo-estado-error">
              No fue posible cargar los recursos del directorio
            </p>
            <p>{errorRecursos}</p>
            <button
              type="button"
              className="boton-primario"
              onClick={alReintentarCarga}
            >
              Reintentar consulta
            </button>
          </div>
        )}

        {!cargandoRecursos && !errorRecursos && recursos.length === 0 && (
          <div className="estado-vacio" role="status">
            <h3 className="titulo-estado-vacio">
              No se encontraron recursos verificados con los filtros seleccionados
            </h3>
            <p>
              La plataforma no simula servicios inexistentes cuando una combinacion de busqueda no tiene registros confirmados. Puede restablecer los filtros para explorar todas las rutas disponibles en el entorno controlado.
            </p>
            <button
              type="button"
              className="boton-secundario"
              onClick={alLimpiarFiltros}
            >
              Mostrar todos los recursos verificados
            </button>
          </div>
        )}

        {!cargandoRecursos && !errorRecursos && recursos.length > 0 && (
          <div className="rejilla-recursos">
            {recursos.map((recurso) => (
              <TarjetaRecurso
                key={recurso.id}
                recurso={recurso}
                alSeleccionarRecurso={alSeleccionarRecurso}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
