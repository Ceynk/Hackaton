const express = require("express");
const controladorCategorias = require("../controladores/controladorCategorias");

const enrutadorCategorias = express.Router();

enrutadorCategorias.get("/", controladorCategorias.listarCategorias);

module.exports = enrutadorCategorias;
