export default function PiePagina() {
  return (
    <footer className="pie-pagina">
      <div className="contenedor-principal rejilla-pie-pagina">
        <div className="columna-pie">
          <h2 className="titulo-pie">Mente Sana Joven</h2>
          <p className="texto-pie">
            Prototipo funcional desarrollado para la Hackathon Villavicencio 2026. Tecnologia para el bienestar emocional juvenil y la conexion segura con rutas de apoyo institucional.
          </p>
          <p className="texto-pie-secundario">
            Esta plataforma no ofrece atencion clinica, diagnosticos psicologicos ni prescripciones medicas. Todos los registros de demostracion son sinteticos.
          </p>
        </div>

        <div className="columna-pie">
          <h3 className="subtitulo-pie">Secciones de la plataforma</h3>
          <ul className="lista-enlaces-pie">
            <li>
              <a href="#inicio">Inicio</a>
            </li>
            <li>
              <a href="#proposito">Proposito y limites eticos</a>
            </li>
            <li>
              <a href="#bienestar">Recursos informativos de bienestar</a>
            </li>
            <li>
              <a href="#directorio">Directorio de rutas de apoyo</a>
            </li>
            <li>
              <a href="#preguntas-frecuentes">Preguntas frecuentes</a>
            </li>
            <li>
              <a href="#transparencia">Transparencia y verificacion</a>
            </li>
          </ul>
        </div>

        <div className="columna-pie">
          <h3 className="subtitulo-pie">Portales institucionales oficiales de referencia</h3>
          <p className="texto-pie-secundario">
            Para consultar directorios gubernamentales vigentes directamente en sus fuentes oficiales:
          </p>
          <ul className="lista-enlaces-pie">
            <li>
              <a
                href="https://www.minsalud.gov.co"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ministerio de Salud y Proteccion Social (minsalud.gov.co)
              </a>
            </li>
            <li>
              <a
                href="https://www.villavicencio.gov.co"
                target="_blank"
                rel="noopener noreferrer"
              >
                Alcaldia de Villavicencio (villavicencio.gov.co)
              </a>
            </li>
            <li>
              <a
                href="https://www.meta.gov.co"
                target="_blank"
                rel="noopener noreferrer"
              >
                Gobernacion del Meta (meta.gov.co)
              </a>
            </li>
            <li>
              <a
                href="https://www.icbf.gov.co"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instituto Colombiano de Bienestar Familiar (icbf.gov.co)
              </a>
            </li>
            <li>
              <a
                href="https://www.mineducacion.gov.co"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ministerio de Educacion Nacional (mineducacion.gov.co)
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="contenedor-principal barra-inferior-pie">
        <p>
          Hackathon Villavicencio 2026 — Reto Mente Sana Joven. Propiedad intelectual de los participantes del equipo desarrollador. Sin recoleccion de datos personales.
        </p>
      </div>
    </footer>
  );
}
