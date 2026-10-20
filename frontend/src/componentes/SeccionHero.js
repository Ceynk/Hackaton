export default function SeccionHero({ alIrADirectorio, totalRutasVerificadas }) {
  return (
    <section id="inicio" className="seccion-hero" aria-labelledby="titulo-principal-hero">
      <div className="contenedor-principal rejilla-hero">
        <div className="columna-texto-hero">
          <p className="etiqueta-contexto">
            Hackathon Villavicencio 2026 — Prototipo Integrado
          </p>
          <h1 id="titulo-principal-hero" className="titulo-hero">
            Mente Sana Joven: orientacion clara y conexion con rutas de apoyo
          </h1>
          <p className="descripcion-hero">
            Pedir ayuda y buscar orientacion es valido. Esta plataforma facilita a los jovenes el acceso a informacion general de bienestar emocional y a un directorio estructurado de recursos institucionales, sin solicitar relatos personales ni datos sensibles.
          </p>
          <div className="grupo-botones-hero">
            <a
              href="#directorio"
              className="boton-primario"
              onClick={alIrADirectorio}
            >
              Consultar recursos de apoyo
            </a>
            <a href="#bienestar" className="boton-secundario">
              Explorar guias de autocuidado
            </a>
          </div>
        </div>

        <aside className="panel-resumen-compromisos" aria-label="Garantias de privacidad y alcance de la plataforma">
          <h2 className="titulo-panel-compromisos">
            Principios de consulta segura
          </h2>
          <ul className="lista-compromisos">
            <li className="item-compromiso">
              <strong>Sin formularios clinicos ni diagnosticos:</strong>
              <span>
                No realizamos evaluaciones psicologicas, clasificaciones de riesgo ni recomendaciones medicas.
              </span>
            </li>
            <li className="item-compromiso">
              <strong>Acceso anonimo sin revelar tu situacion:</strong>
              <span>
                Puedes explorar todas las rutas institucionales sin registrarte ni escribir experiencias personales.
              </span>
            </li>
            <li className="item-compromiso">
              <strong>Trazabilidad y verificacion de fuentes:</strong>
              <span>
                Cada registro muestra su institucion, fuente documental, fecha de consulta y estado de verificacion ({totalRutasVerificadas} rutas sinteticas activas en entorno de demostracion).
              </span>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
