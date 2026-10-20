export default function SeccionProposito() {
  return (
    <section id="proposito" className="seccion-bloque seccion-proposito" aria-labelledby="titulo-proposito">
      <div className="contenedor-principal">
        <div className="encabezado-seccion">
          <p className="subtitulo-seccion">Comprender nuestro alcance</p>
          <h2 id="titulo-proposito" className="titulo-seccion">
            Un puente informativo hacia el acompanamiento humano e institucional
          </h2>
          <p className="introduccion-seccion">
            Muchas veces la principal barrera para buscar apoyo no es la falta de interes, sino el desconocimiento sobre a donde acudir, que esperar de un servicio o el temor a exponer informacion intima en plataformas digitales. Mente Sana Joven organiza la informacion de forma clara, respetuosa y verificable.
          </p>
        </div>

        <div className="rejilla-dos-columnas">
          <article className="tarjeta-alcance tarjeta-alcance-positivo">
            <h3 className="titulo-tarjeta-alcance">
              Lo que facilita Mente Sana Joven
            </h3>
            <ul className="lista-puntos-alcance">
              <li>
                Consultar en un solo lugar el tipo de servicio, la institucion responsable, la poblacion atendida y las condiciones de acceso de cada ruta.
              </li>
              <li>
                Filtrar recursos por categoria de necesidad, modalidad de atencion (presencial, telefonica, virtual o mixta) y tipo de servicio institucional.
              </li>
              <li>
                Acceder a pautas generales de autocuidado cotidiano y criterios practicos para reconocer cuando es conveniente buscar ayuda profesional.
              </li>
              <li>
                Distinguir con transparencia cuales recursos cuentan con verificacion documental y cuales son datos sinteticos de prueba.
              </li>
            </ul>
          </article>

          <article className="tarjeta-alcance tarjeta-alcance-limite">
            <h3 className="titulo-tarjeta-alcance">
              Limites eticos estrictos de la plataforma
            </h3>
            <ul className="lista-puntos-alcance">
              <li>
                No sustituye la consulta ni el acompanamiento de profesionales en psicologia, psiquiatria, medicina o trabajo social.
              </li>
              <li>
                No utiliza chatbots clinicos, inteligencia artificial generativa para dar consejos terapeuticos ni modelos de prediccion de riesgo.
              </li>
              <li>
                No recopila historias clinicas, antecedentes familiares, relatos de crisis ni datos personales de quienes visitan la pagina.
              </li>
              <li>
                No presenta lineas telefonicas ni rutas como confirmadas si no cuentan con fuente oficial y fecha de verificacion comprobada.
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
