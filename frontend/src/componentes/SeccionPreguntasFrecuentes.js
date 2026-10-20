const LISTA_PREGUNTAS_FRECUENTES = [
  {
    identificador: "faq-proposito",
    pregunta: "Cual es el proposito de Mente Sana Joven y cuales son sus limites?",
    respuesta:
      "Mente Sana Joven es una herramienta informativa que acerca a los jovenes a pautas generales de autocuidado y a un directorio organizado de recursos institucionales. No realiza diagnosticos psicologicos ni psiquiatricos, no prescribe tratamientos y no sustituye el acompanamiento de un profesional de la salud."
  },
  {
    identificador: "faq-privacidad",
    pregunta: "Necesito contar mi situacion personal o registrarme para consultar un recurso?",
    respuesta:
      "No. La plataforma fue disenada bajo el principio de privacidad por defecto. No existe registro de usuarios, no se solicitan relatos personales ni antecedentes clinicos y la busqueda funciona exclusivamente por categorias institucionales, modalidades de atencion y palabras clave generales."
  },
  {
    identificador: "faq-lineas-referencia",
    pregunta: "Por que no se publican automaticamente telefonos como la linea 106 o el servicio Yo Te Escucho (316 390 7010) como rutas confirmadas?",
    respuesta:
      "Por responsabilidad etica y verificacion territorial. La vigencia, cobertura, horarios y operador de una linea telefonica pueden variar entre municipios y departamentos. En este prototipo ningun numero mencionado en material secundario se muestra como ruta confirmada sin una verificacion documental directa y actualizada en la fuente oficial del territorio."
  },
  {
    identificador: "faq-atencion-humana",
    pregunta: "Que debo hacer cuando se necesita atencion humana o se presenta una urgencia?",
    respuesta:
      "Si usted o otra persona requiere acompanamiento profesional, acuda a los servicios de salud de su entidad promotora de salud, al area de bienestar de su institucion educativa o a las entidades publicas oficiales de su municipio. Ante una situacion de emergencia inmediata, acuda directamente al servicio de urgencias medicas mas cercano o comuniquese con los canales oficiales de emergencia verificados en portales gubernamentales."
  },
  {
    identificador: "faq-datos-sinteticos",
    pregunta: "Por que los recursos del directorio tienen la etiqueta de Dato sintetico?",
    respuesta:
      "Porque este sistema corresponde a un prototipo integrado y validado en un entorno controlado para la Hackathon Villavicencio 2026. Utilizar datos sinteticos claramente identificados permite demostrar el funcionamiento real de Next.js, Express y PostgreSQL sin inventar servicios reales ni inducir a error a los visitantes."
  }
];

export default function SeccionPreguntasFrecuentes() {
  return (
    <section
      id="preguntas-frecuentes"
      className="seccion-bloque seccion-preguntas"
      aria-labelledby="titulo-preguntas-frecuentes"
    >
      <div className="contenedor-principal">
        <div className="encabezado-seccion">
          <p className="subtitulo-seccion">Claridad sobre el uso de la plataforma</p>
          <h2 id="titulo-preguntas-frecuentes" className="titulo-seccion">
            Preguntas frecuentes
          </h2>
          <p className="introduccion-seccion">
            Respuestas claras sobre como consultar el directorio, como protegemos la privacidad del visitante y cuando acudir a servicios profesionales humanos.
          </p>
        </div>

        <div className="lista-acordeon-preguntas">
          {LISTA_PREGUNTAS_FRECUENTES.map((itemPregunta) => (
            <details key={itemPregunta.identificador} className="item-pregunta-frecuente">
              <summary className="resumen-pregunta">
                {itemPregunta.pregunta}
              </summary>
              <div className="respuesta-pregunta">
                <p>{itemPregunta.respuesta}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
