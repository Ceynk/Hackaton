const express = require("express");
const controladorSalud = require("../controladores/controladorSalud");

const enrutadorSalud = express.Router();

enrutadorSalud.get("/", controladorSalud.consultarEstadoSistema);

module.exports = enrutadorSalud;
