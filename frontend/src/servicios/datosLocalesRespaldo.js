export const datosSaludRespaldo = {
  exito: true,
  proyecto: "Mente Sana Joven",
  nivelMadurez: "Prototipo integrado y validado en entorno controlado",
  salvaguardasActivas: {
    sinDiagnosticoClinico: true,
    sinRecoleccionDatosPersonales: true,
    soloRecursosVerificadosEnDirectorio: true,
    datosDemostracionIdentificadosComoFicticios: true
  },
  baseDatos: {
    conectado: true,
    motor: "datos_locales_respaldo",
    recursosVerificados: 6
  }
};

export const datosCategoriasRespaldo = {
  exito: true,
  total: 5,
  categorias: [
    {
      codigo: "orientacion_institucional",
      nombre: "Orientacion Institucional y Comunitaria",
      descripcion:
        "Rutas de primer contacto para recibir informacion sobre programas publicos de juventud, convivencia y acompanamiento comunitario.",
      ordenVisual: 1,
      totalRecursosVerificados: 2
    },
    {
      codigo: "bienestar_educativo",
      nombre: "Bienestar Estudiantil y Universitario",
      descripcion:
        "Espacios de orientacion academica, adaptacion estudiantil y acompanamiento psicosocial basico en instituciones educativas.",
      ordenVisual: 2,
      totalRecursosVerificados: 1
    },
    {
      codigo: "acompanamiento_psicosocial",
      nombre: "Escucha y Acompanamiento Psicosocial",
      descripcion:
        "Servicios de escucha activa, orientacion emocional no clinica y canalizacion hacia redes formales de salud cuando se requiere.",
      ordenVisual: 3,
      totalRecursosVerificados: 2
    },
    {
      codigo: "proteccion_derechos",
      nombre: "Proteccion de Derechos y Convivencia Familiar",
      descripcion:
        "Entidades encargadas de orientar ante vulneracion de derechos de adolescentes y jovenes o conflictos en el entorno familiar.",
      ordenVisual: 4,
      totalRecursosVerificados: 1
    },
    {
      codigo: "atencion_inmediata",
      nombre: "Rutas de Urgencia y Emergencia General",
      descripcion:
        "Canales oficiales de respuesta inmediata ante situaciones que comprometen la integridad fisica o requieren articulacion de urgencias.",
      ordenVisual: 5,
      totalRecursosVerificados: 1
    }
  ],
  filtrosDisponibles: {
    modalidades: ["Presencial", "Telefonica", "Virtual", "Mixta"],
    tiposServicio: [
      "Orientacion institucional",
      "Bienestar universitario",
      "Acompanamiento psicosocial",
      "Proteccion de derechos",
      "Emergencia general"
    ]
  }
};

export const listaRecursosRespaldo = [
  {
    id: 6,
    codigo_recurso: "DEMO-VVC-006",
    nombre_servicio:
      "Protocolo Sintetico de Articulacion con Emergencias Oficiales (Demostracion)",
    institucion_responsable:
      "Red de Urgencias Simulada - Entorno Controlado",
    descripcion:
      "Registro ficticio de demostracion tecnica. Indica el protocolo prudente cuando se requiere atencion humana inmediata: acudir al servicio de urgencias mas cercano o consultar los canales oficiales de emergencia del territorio.",
    tipo_servicio: "Emergencia general",
    modalidad_atencion: "Telefonica",
    poblacion_atendida: "Toda la poblacion en situacion de urgencia",
    territorio_cobertura: "Nacional y Territorial (Entorno de simulacion)",
    medio_contacto:
      "orientacion prudente: Consultar canales de emergencia oficiales vigentes en portales gubernamentales o acudir al centro de urgencias mas cercano",
    horario_atencion:
      "Disponibilidad permanente en redes oficiales de urgencias de salud",
    condiciones_acceso:
      "Ante una urgencia real, esta plataforma no evalua clinicamente el caso; dirijase de inmediato a un servicio medico o de urgencias oficial.",
    url_oficial: "https://www.minsalud.gov.co",
    fuente_verificacion:
      "Semilla sintetica de validacion tecnica (Enlace institucional de referencia general)",
    fecha_consulta: "2026-10-20",
    estado_verificacion: "verificado_entorno_controlado",
    es_dato_ficticio: true,
    es_atencion_inmediata: true,
    nota_transparencia:
      "Este prototipo no publica numeros de emergencia sin verificacion territorial en tiempo real. Consulte siempre las fuentes oficiales de la Alcaldia de Villavicencio, la Gobernacion del Meta o el Ministerio de Salud.",
    categoria_codigo: "atencion_inmediata",
    categoria_nombre: "Rutas de Urgencia y Emergencia General"
  },
  {
    id: 1,
    codigo_recurso: "DEMO-VVC-001",
    nombre_servicio:
      "Centro Sintetico de Orientacion Juvenil Municipal (Demostracion)",
    institucion_responsable:
      "Entidad Municipal Simulada - Entorno Controlado Villavicencio",
    descripcion:
      "Registro ficticio de demostracion tecnica. Representa un punto municipal de informacion general sobre oferta juvenil, participacion ciudadana y canalizacion a rutas institucionales.",
    tipo_servicio: "Orientacion institucional",
    modalidad_atencion: "Presencial",
    poblacion_atendida: "Jovenes de 14 a 28 anos residentes en el municipio",
    territorio_cobertura: "Villavicencio, Meta (Entorno de simulacion)",
    medio_contacto:
      "Dato sintetico de prueba: Punto de atencion demostrativo sede centro, modulo 1 (No es una direccion ni telefono real)",
    horario_atencion:
      "Horario simulado para prototipo: Lunes a viernes de 08:00 a 17:00",
    condiciones_acceso:
      "Acceso gratuito sin cita previa en el escenario simulado. No solicita relatos clinicos ni antecedentes personales.",
    url_oficial: "https://www.villavicencio.gov.co",
    fuente_verificacion:
      "Semilla sintetica de validacion tecnica (Enlace institucional de referencia general)",
    fecha_consulta: "2026-10-20",
    estado_verificacion: "verificado_entorno_controlado",
    es_dato_ficticio: true,
    es_atencion_inmediata: false,
    nota_transparencia:
      "Este registro es completamente ficticio y se utiliza exclusivamente para validar filtros, consultas SQL y visualizacion en el prototipo.",
    categoria_codigo: "orientacion_institucional",
    categoria_nombre: "Orientacion Institucional y Comunitaria"
  },
  {
    id: 2,
    codigo_recurso: "DEMO-VVC-002",
    nombre_servicio:
      "Unidad Sintetica de Bienestar Universitario Regional (Demostracion)",
    institucion_responsable:
      "Red Academica Simulada del Meta - Entorno Controlado",
    descripcion:
      "Registro ficticio de demostracion tecnica. Ilustra un servicio de acompanamiento estudiantil para manejo de carga academica, habitos de estudio y adaptacion a la vida universitaria.",
    tipo_servicio: "Bienestar universitario",
    modalidad_atencion: "Mixta",
    poblacion_atendida:
      "Estudiantes matriculados en programas tecnicos, tecnologicos y profesionales",
    territorio_cobertura: "Villavicencio, Meta (Entorno de simulacion)",
    medio_contacto:
      "Dato sintetico de prueba: Portal estudiantil interno de demostracion (Sin linea telefonica real)",
    horario_atencion:
      "Horario simulado para prototipo: Lunes a viernes de 07:30 a 18:00",
    condiciones_acceso:
      "Requiere pertenecer a la comunidad estudiantil en el caso de uso simulado. Atencion orientadora no diagnostica.",
    url_oficial: "https://www.mineducacion.gov.co",
    fuente_verificacion:
      "Semilla sintetica de validacion tecnica (Enlace institucional de referencia general)",
    fecha_consulta: "2026-10-20",
    estado_verificacion: "verificado_entorno_controlado",
    es_dato_ficticio: true,
    es_atencion_inmediata: false,
    nota_transparencia:
      "Este registro es completamente ficticio. Para bienestar estudiantil real, cada joven debe consultar la oficina oficial de su institucion educativa.",
    categoria_codigo: "bienestar_educativo",
    categoria_nombre: "Bienestar Estudiantil y Universitario"
  },
  {
    id: 3,
    codigo_recurso: "DEMO-VVC-003",
    nombre_servicio:
      "Servicio Sintetico de Escucha y Canalizacion Psicosocial (Demostracion)",
    institucion_responsable:
      "Programa Departamental Simulado - Entorno Controlado",
    descripcion:
      "Registro ficticio de demostracion tecnica. Representa un canal de primera escucha, orientacion en momentos de sobrecarga emocional cotidiana y derivacion hacia servicios humanos de salud.",
    tipo_servicio: "Acompanamiento psicosocial",
    modalidad_atencion: "Telefonica",
    poblacion_atendida: "Adolescentes, jovenes y familias del departamento",
    territorio_cobertura: "Departamento del Meta (Entorno de simulacion)",
    medio_contacto:
      "Dato sintetico de prueba: Canal telefonico simulado #000-DEMO (No marcar, numero ficticio de prueba)",
    horario_atencion:
      "Horario simulado para prototipo: Atencion continua en escenario de prueba",
    condiciones_acceso:
      "Servicio informativo y de primera escucha en entorno simulado. No reemplaza consulta psicologica ni psiquiatrica.",
    url_oficial: "https://www.meta.gov.co",
    fuente_verificacion:
      "Semilla sintetica de validacion tecnica (Enlace institucional de referencia general)",
    fecha_consulta: "2026-10-20",
    estado_verificacion: "verificado_entorno_controlado",
    es_dato_ficticio: true,
    es_atencion_inmediata: false,
    nota_transparencia:
      "Registro ficticio para pruebas de filtrado por modalidad telefonica. Los numeros reales deben verificarse directamente en portales gubernamentales vigentes.",
    categoria_codigo: "acompanamiento_psicosocial",
    categoria_nombre: "Escucha y Acompanamiento Psicosocial"
  },
  {
    id: 4,
    codigo_recurso: "DEMO-VVC-004",
    nombre_servicio:
      "Plataforma Sintetica de Orientacion Virtual Joven (Demostracion)",
    institucion_responsable:
      "Laboratorio Ciudadano Simulado - Entorno Controlado",
    descripcion:
      "Registro ficticio de demostracion tecnica. Muestra como se estructura un directorio de orientacion virtual asincronica sobre pautas de autocuidado y directorio de entidades publicas.",
    tipo_servicio: "Orientacion institucional",
    modalidad_atencion: "Virtual",
    poblacion_atendida: "Jovenes entre 14 y 28 anos con acceso a internet",
    territorio_cobertura: "Cobertura departamental simulada",
    medio_contacto:
      "Dato sintetico de prueba: Formulario informativo de demostracion sin recoleccion de datos personales",
    horario_atencion:
      "Horario simulado para prototipo: Consulta permanente de informacion validada",
    condiciones_acceso:
      "Abierto a consulta publica sin registro de identidad ni recoleccion de datos sensibles.",
    url_oficial: "https://www.minsalud.gov.co",
    fuente_verificacion:
      "Semilla sintetica de validacion tecnica (Enlace institucional de referencia general)",
    fecha_consulta: "2026-10-20",
    estado_verificacion: "verificado_entorno_controlado",
    es_dato_ficticio: true,
    es_atencion_inmediata: false,
    nota_transparencia:
      "Registro ficticio para demostrar la modalidad virtual dentro del prototipo integrado.",
    categoria_codigo: "acompanamiento_psicosocial",
    categoria_nombre: "Escucha y Acompanamiento Psicosocial"
  },
  {
    id: 5,
    codigo_recurso: "DEMO-VVC-005",
    nombre_servicio:
      "Ruta Sintetica de Orientacion en Derechos Juveniles y Familiares (Demostracion)",
    institucion_responsable:
      "Defensoria y Proteccion Simulada - Entorno Controlado",
    descripcion:
      "Registro ficticio de demostracion tecnica. Representa la ruta institucional para orientar a jovenes sobre convivencia familiar, prevencion de violencias y restablecimiento de derechos.",
    tipo_servicio: "Proteccion de derechos",
    modalidad_atencion: "Presencial",
    poblacion_atendida: "Ninos, ninas, adolescentes y jovenes",
    territorio_cobertura: "Villavicencio, Meta (Entorno de simulacion)",
    medio_contacto:
      "Dato sintetico de prueba: Ventanilla unica simulada para pruebas de software",
    horario_atencion:
      "Horario simulado para prototipo: Lunes a viernes en jornada laboral simulada",
    condiciones_acceso:
      "Orientacion institucional gratuita. En casos reales se debe acudir directamente al ICBF, Comisaria de Familia o Defensoria del Pueblo.",
    url_oficial: "https://www.icbf.gov.co",
    fuente_verificacion:
      "Semilla sintetica de validacion tecnica (Enlace institucional de referencia general)",
    fecha_consulta: "2026-10-20",
    estado_verificacion: "verificado_entorno_controlado",
    es_dato_ficticio: true,
    es_atencion_inmediata: false,
    nota_transparencia:
      "Registro sintetico. El enlace dirige al portal oficial del ICBF unicamente como referencia institucional general.",
    categoria_codigo: "proteccion_derechos",
    categoria_nombre: "Proteccion de Derechos y Convivencia Familiar"
  }
];

export const listaContenidosRespaldo = [
  {
    id: 1,
    codigo: "GUIA-AUTOCUIDADO-01",
    titulo: "Habitos cotidianos para regular la sobrecarga academica y laboral",
    eje_tematico: "Autocuidado cotidiano",
    resumen:
      "Organizar los tiempos de descanso, alimentacion y desconexion digital ayuda a reducir el agotamiento acumulado durante periodos de alta exigencia estudiantil o laboral.",
    recomendaciones_practicas:
      "Establecer bloques de estudio o trabajo con pausas breves; conservar horarios regulares de sueno; separar espacios de descanso del uso continuo de pantallas; dialogar con docentes o coordinadores cuando la carga supere la capacidad semanal.",
    senales_buscar_apoyo:
      "Cuando el cansancio impide cumplir actividades basicas durante varias semanas, aparecen alteraciones constantes del sueno o se experimenta aislamiento frente a personas cercanas.",
    limitacion_alcance:
      "Contenido informativo general. No constituye evaluacion clinica, diagnostico psicologico ni plan de tratamiento individual.",
    fuente_referencia:
      "Material pedagogico sintetico basado en pautas generales de bienestar estudiantil (Entorno de demostracion)",
    es_dato_ficticio: true,
    orden_visual: 1
  },
  {
    id: 2,
    codigo: "GUIA-SENALES-02",
    titulo: "Reconocer cuando es momento de conversar y pedir orientacion",
    eje_tematico: "Reconocimiento de situaciones",
    resumen:
      "Identificar cambios persistentes en el animo, la motivacion o la convivencia permite buscar apoyo institucional o profesional de manera oportuna sin esperar a una situacion limite.",
    recomendaciones_practicas:
      "Observar si las preocupaciones ocupan la mayor parte del dia; identificar al menos una persona de confianza o un servicio de orientacion estudiantil; recordar que solicitar informacion no obliga a exponer detalles intimos.",
    senales_buscar_apoyo:
      "Cuando las dificultades emocionales interfieren de forma continua con el estudio, el trabajo, la alimentacion o las relaciones familiares y sociales.",
    limitacion_alcance:
      "Esta guia no clasifica niveles de riesgo ni reemplaza el criterio de un profesional en psicologia, medicina o trabajo social.",
    fuente_referencia:
      "Material pedagogico sintetico para orientacion preventiva juvenil (Entorno de demostracion)",
    es_dato_ficticio: true,
    orden_visual: 2
  },
  {
    id: 3,
    codigo: "GUIA-REDES-03",
    titulo: "Como funcionan las rutas de apoyo institucional y que esperar al acudir",
    eje_tematico: "Orientacion para pedir ayuda",
    resumen:
      "Conocer de antemano que hace una oficina de bienestar universitario, una comisaria, una defensoria o un servicio de escucha reduce la incertidumbre al dar el primer paso.",
    recomendaciones_practicas:
      "Verificar siempre que el canal provenga de una fuente oficial; consultar los requisitos de acceso y horarios; preparar las dudas generales sobre el tramite o servicio antes de comunicarse.",
    senales_buscar_apoyo:
      "Cuando se requiere informacion sobre derechos en salud, acompanamiento psicosocial institucional, mediacion familiar o articulacion con servicios publicos locales.",
    limitacion_alcance:
      "La disponibilidad real de cada servicio depende de la entidad responsable en el municipio o departamento correspondiente.",
    fuente_referencia:
      "Guia sintetica de alfabetizacion institucional para jovenes (Entorno de demostracion)",
    es_dato_ficticio: true,
    orden_visual: 3
  },
  {
    id: 4,
    codigo: "GUIA-CONVIVENCIA-04",
    titulo: "Acompanar a un amigo o companero sin asumir el rol de terapeuta",
    eje_tematico: "Convivencia y redes de apoyo",
    resumen:
      "La escucha respetuosa entre pares es valiosa, pero acompanar a otra persona tambien implica reconocer los propios limites y facilitar el contacto con ayuda profesional o institucional.",
    recomendaciones_practicas:
      "Escuchar sin juzgar ni minimizar lo que la otra persona expresa; evitar prometer secretos absolutos cuando exista riesgo para la integridad; compartir informacion de rutas institucionales verificadas.",
    senales_buscar_apoyo:
      "Cuando un companero manifiesta malestar intenso, aislamiento prolongado o necesidad de orientacion especializada que supera el apoyo entre pares.",
    limitacion_alcance:
      "Apoyar a un par no equivale a realizar intervencion clinica. Ante urgencias, siempre se debe acudir a servicios profesionales y canales oficiales.",
    fuente_referencia:
      "Material pedagogico sintetico sobre apoyo comunitario responsable (Entorno de demostracion)",
    es_dato_ficticio: true,
    orden_visual: 4
  }
];

export function obtenerRecursosFiltradosRespaldo(filtros = {}) {
  let resultado = listaRecursosRespaldo.slice();

  if (filtros.categoria) {
    resultado = resultado.filter((recurso) => recurso.categoria_codigo === filtros.categoria);
  }

  if (filtros.modalidad) {
    resultado = resultado.filter((recurso) => recurso.modalidad_atencion === filtros.modalidad);
  }

  if (filtros.tipoServicio) {
    resultado = resultado.filter((recurso) => recurso.tipo_servicio === filtros.tipoServicio);
  }

  if (filtros.soloAtencionInmediata === "true" || filtros.soloAtencionInmediata === true) {
    resultado = resultado.filter((recurso) => recurso.es_atencion_inmediata === true);
  }

  if (filtros.busqueda) {
    const termino = filtros.busqueda.toLowerCase();
    resultado = resultado.filter((recurso) => {
      const enNombre = recurso.nombre_servicio.toLowerCase().includes(termino);
      const enInstitucion = recurso.institucion_responsable.toLowerCase().includes(termino);
      const enDescripcion = recurso.descripcion.toLowerCase().includes(termino);
      return enNombre || enInstitucion || enDescripcion;
    });
  }

  return {
    exito: true,
    total: resultado.length,
    filtrosAplicados: {
      categoria: filtros.categoria || "",
      modalidad: filtros.modalidad || "",
      tipoServicio: filtros.tipoServicio || "",
      busqueda: filtros.busqueda || "",
      soloAtencionInmediata:
        filtros.soloAtencionInmediata === "true" || filtros.soloAtencionInmediata === true
    },
    avisoUsoResponsable:
      "Este directorio publica unicamente registros en estado verificado_entorno_controlado. Los datos actuales son sinteticos para demostracion y no sustituyen atencion profesional.",
    recursos: resultado
  };
}

export function obtenerRecursoPorIdentificadorRespaldo(identificadorRecurso) {
  const numeroId = Number(identificadorRecurso);
  const recursoEncontrado = listaRecursosRespaldo.find(
    (recurso) => recurso.id === numeroId
  );

  if (!recursoEncontrado) {
    return null;
  }

  return {
    exito: true,
    recurso: recursoEncontrado
  };
}

export function obtenerContenidosRespaldo(ejeFiltro = "") {
  let resultado = listaContenidosRespaldo.slice();

  if (ejeFiltro) {
    resultado = resultado.filter(
      (contenido) => contenido.eje_tematico === ejeFiltro
    );
  }

  const ejesDisponibles = [
    "Autocuidado cotidiano",
    "Reconocimiento de situaciones",
    "Orientacion para pedir ayuda",
    "Convivencia y redes de apoyo"
  ];

  return {
    exito: true,
    total: resultado.length,
    ejesTematicosDisponibles: ejesDisponibles,
    contenidos: resultado
  };
}
