const express = require('express');

// controllers
const usuarioController = require('../controllers/usuarioController');
const incidenteController = require('../controllers/incidenteController');
const sessaoController = require('../controllers/sessaoController');

const routes = express.Router();

// sessão
routes.post('/sessao', sessaoController.login);
// usuario
routes.put('/usuario', usuarioController.atualizar);
routes.post('/usuario', usuarioController.criar);
routes.delete('/usuario', usuarioController.deletar);

// incidentes
routes.post('/incidente', incidenteController.criar);
routes.delete('/incidente/:id', incidenteController.deletar);
routes.get('/incidente/', incidenteController.listar);
routes.get('/incidente/:status', incidenteController.listarStatus);
routes.put('/incidente/:id', incidenteController.encerrar);

module.exports = routes;