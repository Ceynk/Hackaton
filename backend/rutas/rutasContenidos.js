const express = require("express");
const controladorContenidos = require("../controladores/controladorContenidos");

const enrutadorContenidos = express.Router();

enrutadorContenidos.get("/", controladorContenidos.listarContenidosBienestar);

module.exports = enrutadorContenidos;
