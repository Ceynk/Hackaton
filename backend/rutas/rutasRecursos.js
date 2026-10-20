const express = require("express");
const controladorRecursos = require("../controladores/controladorRecursos");

const enrutadorRecursos = express.Router();

enrutadorRecursos.get("/", controladorRecursos.listarRecursos);
enrutadorRecursos.get(
  "/auditoria-verificacion",
  controladorRecursos.obtenerAuditoriaVerificacion
);
enrutadorRecursos.get("/:id", controladorRecursos.obtenerDetalleRecurso);

enrutadorRecursos.all("*", (solicitud, respuesta) => {
  return respuesta.status(405).json({
    exito: false,
    mensaje:
      "Operacion no permitida. Los visitantes no pueden crear, modificar ni cambiar el estado de verificacion de los recursos."
  });
});

module.exports = enrutadorRecursos;
