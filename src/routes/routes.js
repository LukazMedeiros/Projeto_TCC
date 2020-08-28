const express = require('express');

// controllers
const usuarioController = require('../controllers/usuarioController');

const routes = express.Router();

routes.get('/', usuarioController.create)

module.exports = routes;