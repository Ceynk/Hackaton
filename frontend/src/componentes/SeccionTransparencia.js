export default function SeccionTransparencia() {
  return (
    <section
      id="transparencia"
      className="seccion-bloque seccion-transparencia"
      aria-labelledby="titulo-transparencia"
    >
      <div className="contenedor-principal">
        <div className="encabezado-seccion">
          <p className="subtitulo-seccion">Verificacion, privacidad y reglas de la hackathon</p>
          <h2 id="titulo-transparencia" className="titulo-seccion">
            Transparencia, tratamiento de datos y control de fuentes
          </h2>
          <p className="introduccion-seccion">
            La confianza en una plataforma de orientacion juvenil exige explicar con precision de donde proviene la informacion, que datos se procesan y como se bloquea la publicacion de rutas no verificadas.
          </p>
        </div>

        <div className="rejilla-tres-columnas">
          <article className="tarjeta-transparencia">
            <h3 className="titulo-tarjeta-transparencia">
              Tratamiento de datos y privacidad
            </h3>
            <p>
              Esta aplicacion no almacena informacion personal, direcciones IP identificables permanentemente, historias clinicas ni relatos emocionales de los visitantes. Las consultas al directorio son de solo lectura y no utilizan cookies de rastreo publicitario ni analitica invasiva.
            </p>
          </article>

          <article className="tarjeta-transparencia">
            <h3 className="titulo-tarjeta-transparencia">
              Procedencia y verificacion de rutas
            </h3>
            <p>
              La base de datos PostgreSQL aplica una restriccion de integridad que impide marcar un recurso como verificado si no posee fuente documental, URL oficial y fecha de consulta. Cualquier registro en estado <code>pendiente_verificacion</code> queda excluido automaticamente del directorio publico.
            </p>
          </article>

          <article className="tarjeta-transparencia">
            <h3 className="titulo-tarjeta-transparencia">
              Declaracion Hackathon Villavicencio 2026
            </h3>
            <p>
              La propiedad intelectual de esta solucion pertenece a sus participantes. El prototipo opera en un entorno controlado con datos sinteticos. Se construyo sobre tecnologias de codigo abierto: Next.js, React, Express y PostgreSQL (paquete pg / PGlite bajo licencias MIT y PostgreSQL).
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
