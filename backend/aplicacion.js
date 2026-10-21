const express = require("express");
const cors = require("cors");
const configuracionEntorno = require("./configuracion/entorno");
const rutasSalud = require("./rutas/rutasSalud");
const rutasCategorias = require("./rutas/rutasCategorias");
const rutasRecursos = require("./rutas/rutasRecursos");
const rutasContenidos = require("./rutas/rutasContenidos");

const aplicacion = express();

aplicacion.disable("x-powered-by");

const registroSolicitudesPorIp = new Map();
const VENTANA_TIEMPO_MS = 60 * 1000;
const LIMITE_SOLICITUDES_POR_VENTANA = 120;

function limitarSolicitudesPorMinuto(solicitud, respuesta, siguiente) {
  const direccionCliente = solicitud.ip || "cliente_local";
  const tiempoActual = Date.now();
  const estadoCliente = registroSolicitudesPorIp.get(direccionCliente);

  if (!estadoCliente || tiempoActual - estadoCliente.inicioVentana > VENTANA_TIEMPO_MS) {
    registroSolicitudesPorIp.set(direccionCliente, {
      inicioVentana: tiempoActual,
      conteo: 1
    });
    return siguiente();
  }

  estadoCliente.conteo += 1;

  if (estadoCliente.conteo > LIMITE_SOLICITUDES_POR_VENTANA) {
    return respuesta.status(429).json({
      exito: false,
      mensaje: "Se ha superado el limite de consultas permitidas por minuto. Intente nuevamente en unos momentos."
    });
  }

  return siguiente();
}

function aplicarEncabezadosSeguridad(solicitud, respuesta, siguiente) {
  respuesta.setHeader("X-Content-Type-Options", "nosniff");
  respuesta.setHeader("X-Frame-Options", "DENY");
  respuesta.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  siguiente();
}

const origenesPermitidos = configuracionEntorno.origenPermitidoCors
  .split(",")
  .map((origen) => origen.trim())
  .filter(Boolean);

aplicacion.use(aplicarEncabezadosSeguridad);
aplicacion.use(
  cors({
    origin(origenSolicitud, callback) {
      if (!origenSolicitud) {
        return callback(null, true);
      }
      const esOrigenLocal =
        origenSolicitud.startsWith("http://localhost:") ||
        origenSolicitud.startsWith("http://127.0.0.1:") ||
        origenSolicitud === "http://localhost" ||
        origenSolicitud === "http://127.0.0.1";
      if (
        origenesPermitidos.includes("*") ||
        esOrigenLocal ||
        origenesPermitidos.includes(origenSolicitud)
      ) {
        return callback(null, true);
      }
      return callback(new Error("Origen no autorizado por la politica CORS"));
    },
    methods: ["GET", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Accept"]
  })
);
aplicacion.use(express.json({ limit: "16kb" }));
aplicacion.use(limitarSolicitudesPorMinuto);

aplicacion.get("/", (solicitud, respuesta) => {
  respuesta.json({
    exito: true,
    mensaje: "API Mente Sana Joven activa",
    salud: "/api/salud"
  });
});

aplicacion.use("/api/salud", rutasSalud);
aplicacion.use("/api/categorias", rutasCategorias);
aplicacion.use("/api/recursos", rutasRecursos);
aplicacion.use("/api/contenidos-bienestar", rutasContenidos);

aplicacion.use((solicitud, respuesta) => {
  respuesta.status(404).json({
    exito: false,
    mensaje: "La ruta solicitada no existe en la API de Mente Sana Joven."
  });
});

aplicacion.use((errorCapturado, solicitud, respuesta, siguiente) => {
  if (errorCapturado && errorCapturado.message === "Origen no autorizado por la politica CORS") {
    return respuesta.status(403).json({
      exito: false,
      mensaje: "Solicitud bloqueada por la configuracion de origenes permitidos."
    });
  }

  return respuesta.status(500).json({
    exito: false,
    mensaje:
      "No fue posible procesar la solicitud en este momento. Verifique la disponibilidad del servicio de datos."
  });
});

module.exports = aplicacion;
