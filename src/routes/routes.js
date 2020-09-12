const express = require('express');

// controllers
const usuarioController = require('../controllers/usuarioController');
const incidenteController = require('../controllers/incidenteController');

const routes = express.Router();

// usuario
routes.put('/usuario', usuarioController.atualizar);
routes.post('/usuario', usuarioController.criar);
routes.delete('/usuario', usuarioController.deletar);

// incidentes
routes.post('/incidente', incidenteController.criar);
routes.delete('/incidente/:id', incidenteController.deletar);
routes.get('/incidente/', incidenteController.listar);
routes.put('/incidente/:id', incidenteController.encerrar);

module.exports = routes;