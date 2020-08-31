const express = require('express');

// controllers
const usuarioController = require('../controllers/usuarioController');

const routes = express.Router();

routes.put('/', usuarioController.atualizar);
routes.post('/', usuarioController.criar);
routes.delete('/', usuarioController.deletar);

module.exports = routes;