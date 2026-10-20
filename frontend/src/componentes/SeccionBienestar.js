export default function SeccionBienestar({
  contenidos,
  ejesDisponibles,
  ejeSeleccionado,
  alCambiarEje,
  cargandoContenidos,
  errorContenidos
}) {
  return (
    <section id="bienestar" className="seccion-bloque seccion-bienestar" aria-labelledby="titulo-bienestar">
      <div className="contenedor-principal">
        <div className="encabezado-seccion">
          <p className="subtitulo-seccion">Informacion general y preventiva</p>
          <h2 id="titulo-bienestar" className="titulo-seccion">
            Recursos informativos sobre bienestar emocional y autocuidado cotidiano
          </h2>
          <p className="introduccion-seccion">
            Estos contenidos ofrecen orientacion educativa sobre habitos de cuidado diario, reconocimiento de senales para pedir apoyo y funcionamiento de las rutas institucionales. No diagnostican ni prescriben tratamientos.
          </p>
        </div>

        <div className="barra-filtros-ejes" role="group" aria-label="Filtrar contenidos por eje tematico">
          <button
            type="button"
            className={`boton-filtro-eje ${ejeSeleccionado === "" ? "boton-filtro-eje-activo" : ""}`}
            aria-pressed={ejeSeleccionado === ""}
            onClick={() => alCambiarEje("")}
          >
            Todos los ejes ({contenidos.length})
          </button>
          {ejesDisponibles.map((eje) => (
            <button
              key={eje}
              type="button"
              className={`boton-filtro-eje ${ejeSeleccionado === eje ? "boton-filtro-eje-activo" : ""}`}
              aria-pressed={ejeSeleccionado === eje}
              onClick={() => alCambiarEje(eje)}
            >
              {eje}
            </button>
          ))}
        </div>

        {cargandoContenidos && (
          <div className="estado-informativo" role="status" aria-live="polite">
            Cargando contenidos informativos desde la base de datos...
          </div>
        )}

        {!cargandoContenidos && errorContenidos && (
          <div className="estado-error" role="alert">
            <p>{errorContenidos}</p>
          </div>
        )}

        {!cargandoContenidos && !errorContenidos && contenidos.length === 0 && (
          <div className="estado-vacio" role="status">
            No se encontraron contenidos para el eje tematico seleccionado.
          </div>
        )}

        {!cargandoContenidos && !errorContenidos && contenidos.length > 0 && (
          <div className="rejilla-contenidos">
            {contenidos.map((itemContenido) => {
              const listaPracticas = itemContenido.recomendaciones_practicas
                .split(";")
                .map((frase) => frase.trim())
                .filter(Boolean);

              return (
                <article key={itemContenido.id} className="tarjeta-contenido">
                  <div className="encabezado-tarjeta-contenido">
                    <span className="etiqueta-eje">{itemContenido.eje_tematico}</span>
                    {itemContenido.es_dato_ficticio && (
                      <span className="etiqueta-sintetico">
                        Contenido sintetico
                      </span>
                    )}
                  </div>
                  <h3 className="titulo-tarjeta-contenido">{itemContenido.titulo}</h3>
                  <p className="resumen-tarjeta-contenido">{itemContenido.resumen}</p>

                  <div className="bloque-interno-contenido">
                    <h4 className="subtitulo-interno-contenido">
                      Pautas practicas de orientacion:
                    </h4>
                    <ul className="lista-pautas">
                      {listaPracticas.map((pauta, indice) => (
                        <li key={indice}>{pauta}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bloque-interno-contenido bloque-senales">
                    <h4 className="subtitulo-interno-contenido">
                      Cuando puede ser util buscar apoyo:
                    </h4>
                    <p>{itemContenido.senales_buscar_apoyo}</p>
                  </div>

                  <footer className="pie-tarjeta-contenido">
                    <p className="nota-alcance-contenido">
                      <strong>Alcance:</strong> {itemContenido.limitacion_alcance}
                    </p>
                    <p className="fuente-contenido">
                      <strong>Fuente:</strong> {itemContenido.fuente_referencia}
                    </p>
                  </footer>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
