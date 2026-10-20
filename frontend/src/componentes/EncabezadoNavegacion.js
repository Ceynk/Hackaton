export default function EncabezadoNavegacion() {
  return (
    <header className="encabezado-sitio">
      <div className="contenedor-principal encabezado-interior">
        <div className="marca-sitio">
          <a href="#inicio" className="enlace-marca">
            <span className="marca-titulo">Mente Sana Joven</span>
            <span className="marca-subtitulo">
              Informacion validada y rutas de apoyo institucional
            </span>
          </a>
        </div>
        <nav aria-label="Navegacion principal" className="navegacion-principal">
          <ul className="lista-navegacion">
            <li>
              <a href="#proposito" className="enlace-navegacion">
                Proposito
              </a>
            </li>
            <li>
              <a href="#bienestar" className="enlace-navegacion">
                Bienestar cotidiano
              </a>
            </li>
            <li>
              <a href="#directorio" className="enlace-navegacion enlace-navegacion-destacado">
                Directorio de apoyo
              </a>
            </li>
            <li>
              <a href="#preguntas-frecuentes" className="enlace-navegacion">
                Preguntas frecuentes
              </a>
            </li>
            <li>
              <a href="#transparencia" className="enlace-navegacion">
                Transparencia
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
