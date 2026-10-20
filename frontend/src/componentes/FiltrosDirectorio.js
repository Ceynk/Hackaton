export default function FiltrosDirectorio({
  categorias,
  modalidadesDisponibles,
  tiposServicioDisponibles,
  filtrosActivos,
  textoBusquedaTemporal,
  errorBusqueda,
  alCambiarCampoFiltro,
  alCambiarTextoBusqueda,
  alEjecutarBusqueda,
  alLimpiarFiltros
}) {
  function manejarEnvioFormulario(evento) {
    evento.preventDefault();
    alEjecutarBusqueda();
  }

  const hayFiltrosAplicados = Boolean(
    filtrosActivos.categoria ||
      filtrosActivos.modalidad ||
      filtrosActivos.tipoServicio ||
      filtrosActivos.busqueda ||
      filtrosActivos.soloAtencionInmediata ||
      textoBusquedaTemporal
  );

  return (
    <form
      className="panel-filtros-directorio"
      role="search"
      aria-label="Filtrar recursos del directorio de apoyo"
      onSubmit={manejarEnvioFormulario}
      noValidate
    >
      <div className="rejilla-filtros">
        <div className="campo-formulario">
          <label htmlFor="filtro-categoria" className="etiqueta-campo">
            Categoria de apoyo
          </label>
          <select
            id="filtro-categoria"
            name="categoria"
            className="control-entrada"
            value={filtrosActivos.categoria}
            onChange={(evento) => alCambiarCampoFiltro("categoria", evento.target.value)}
          >
            <option value="">Todas las categorias verificadas</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.codigo}>
                {categoria.nombre} ({categoria.total_recursos_verificados})
              </option>
            ))}
          </select>
        </div>

        <div className="campo-formulario">
          <label htmlFor="filtro-modalidad" className="etiqueta-campo">
            Modalidad de atencion
          </label>
          <select
            id="filtro-modalidad"
            name="modalidad"
            className="control-entrada"
            value={filtrosActivos.modalidad}
            onChange={(evento) => alCambiarCampoFiltro("modalidad", evento.target.value)}
          >
            <option value="">Todas las modalidades</option>
            {modalidadesDisponibles.map((modalidad) => (
              <option key={modalidad} value={modalidad}>
                {modalidad}
              </option>
            ))}
          </select>
        </div>

        <div className="campo-formulario">
          <label htmlFor="filtro-tipo-servicio" className="etiqueta-campo">
            Tipo de servicio
          </label>
          <select
            id="filtro-tipo-servicio"
            name="tipoServicio"
            className="control-entrada"
            value={filtrosActivos.tipoServicio}
            onChange={(evento) => alCambiarCampoFiltro("tipoServicio", evento.target.value)}
          >
            <option value="">Todos los tipos de servicio</option>
            {tiposServicioDisponibles.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="fila-busqueda-filtros">
        <div className="campo-formulario campo-busqueda-expandido">
          <label htmlFor="filtro-busqueda" className="etiqueta-campo">
            Buscar por palabra clave institucional
          </label>
          <div className="contenedor-input-busqueda">
            <input
              id="filtro-busqueda"
              type="search"
              name="busqueda"
              maxLength={80}
              className={`control-entrada ${errorBusqueda ? "control-entrada-error" : ""}`}
              placeholder="Ejemplo: universitario, escucha, derechos, municipal..."
              value={textoBusquedaTemporal}
              onChange={(evento) => alCambiarTextoBusqueda(evento.target.value)}
              aria-describedby="ayuda-busqueda-segura mensaje-error-busqueda"
              aria-invalid={Boolean(errorBusqueda)}
            />
            <button type="submit" className="boton-primario boton-buscar">
              Aplicar busqueda
            </button>
          </div>
          <p id="ayuda-busqueda-segura" className="texto-ayuda-campo">
            Consulte por tipo de entidad o tema institucional. Por privacidad, no ingrese datos personales ni experiencias sensibles.
          </p>
          {errorBusqueda && (
            <p id="mensaje-error-busqueda" className="mensaje-error-campo" role="alert">
              {errorBusqueda}
            </p>
          )}
        </div>

        <div className="acciones-secundarias-filtro">
          <label className="etiqueta-casilla">
            <input
              type="checkbox"
              checked={filtrosActivos.soloAtencionInmediata}
              onChange={(evento) =>
                alCambiarCampoFiltro("soloAtencionInmediata", evento.target.checked)
              }
            />
            <span>Mostrar solo protocolo de urgencia inmediata</span>
          </label>

          {hayFiltrosAplicados && (
            <button
              type="button"
              className="boton-secundario boton-limpiar"
              onClick={alLimpiarFiltros}
            >
              Restablecer filtros
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
