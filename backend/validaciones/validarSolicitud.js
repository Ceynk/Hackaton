const MODALIDADES_PERMITIDAS = [
  "Presencial",
  "Telefonica",
  "Virtual",
  "Mixta"
];

const TIPOS_SERVICIO_PERMITIDOS = [
  "Orientacion institucional",
  "Bienestar universitario",
  "Acompanamiento psicosocial",
  "Proteccion de derechos",
  "Emergencia general"
];

const EJES_TEMATICOS_PERMITIDOS = [
  "Autocuidado cotidiano",
  "Reconocimiento de situaciones",
  "Orientacion para pedir ayuda",
  "Convivencia y redes de apoyo"
];

const PATRON_CODIGO_CATEGORIA = /^[a-z0-9_]{2,60}$/;
const PATRON_TEXTO_BUSQUEDA = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s.,-]{1,80}$/;

function limpiarTexto(valorEntrada) {
  if (typeof valorEntrada !== "string") {
    return "";
  }
  return valorEntrada.trim().replace(/\s+/g, " ");
}

function validarFiltrosRecursos(parametrosConsulta = {}) {
  const erroresValidacion = [];
  const categoria = limpiarTexto(parametrosConsulta.categoria);
  const modalidad = limpiarTexto(parametrosConsulta.modalidad);
  const tipoServicio = limpiarTexto(parametrosConsulta.tipoServicio);
  const busqueda = limpiarTexto(parametrosConsulta.busqueda);
  const soloAtencionInmediata = parametrosConsulta.soloAtencionInmediata === "true";

  if (categoria && !PATRON_CODIGO_CATEGORIA.test(categoria)) {
    erroresValidacion.push("El codigo de categoria proporcionado no tiene un formato valido.");
  }

  if (modalidad && !MODALIDADES_PERMITIDAS.includes(modalidad)) {
    erroresValidacion.push("La modalidad de atencion seleccionada no es valida.");
  }

  if (tipoServicio && !TIPOS_SERVICIO_PERMITIDOS.includes(tipoServicio)) {
    erroresValidacion.push("El tipo de servicio seleccionado no se encuentra dentro de los valores permitidos.");
  }

  if (busqueda) {
    if (busqueda.length > 80) {
      erroresValidacion.push("El termino de busqueda no puede superar los 80 caracteres. No ingrese relatos personales.");
    } else if (!PATRON_TEXTO_BUSQUEDA.test(busqueda)) {
      erroresValidacion.push("El termino de busqueda contiene caracteres no permitidos.");
    }
  }

  return {
    esValido: erroresValidacion.length === 0,
    errores: erroresValidacion,
    filtrosNormalizados: {
      categoria: categoria || null,
      modalidad: modalidad || null,
      tipoServicio: tipoServicio || null,
      busqueda: busqueda || null,
      soloAtencionInmediata
    }
  };
}

function validarIdentificadorNumerico(valorIdentificador) {
  const textoLimpio = limpiarTexto(String(valorIdentificador ?? ""));
  if (!/^[1-9]\d{0,5}$/.test(textoLimpio)) {
    return {
      esValido: false,
      error: "El identificador del recurso debe ser un numero entero positivo valido.",
      identificador: null
    };
  }

  return {
    esValido: true,
    error: null,
    identificador: Number(textoLimpio)
  };
}

function validarFiltroContenidos(parametrosConsulta = {}) {
  const ejeTematico = limpiarTexto(parametrosConsulta.ejeTematico);

  if (ejeTematico && !EJES_TEMATICOS_PERMITIDOS.includes(ejeTematico)) {
    return {
      esValido: false,
      error: "El eje tematico solicitado no es valido.",
      ejeTematico: null
    };
  }

  return {
    esValido: true,
    error: null,
    ejeTematico: ejeTematico || null
  };
}

module.exports = {
  MODALIDADES_PERMITIDAS,
  TIPOS_SERVICIO_PERMITIDOS,
  EJES_TEMATICOS_PERMITIDOS,
  validarFiltrosRecursos,
  validarIdentificadorNumerico,
  validarFiltroContenidos
};
