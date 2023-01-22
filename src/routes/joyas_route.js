const express = require("express");
const ruta = express.Router();
const {
  getJoyasPorFiltros,
  getJoyasFiltro,
  getJoyas,
} = require("../controllers/joyas_controllers");

ruta.route("/joyas").get(getJoyas);

// ruta.route("/joyas/filtro").get(getJoyasFiltro);

ruta.route("/joyas/filtros").get(getJoyasPorFiltros);

module.exports = ruta;
