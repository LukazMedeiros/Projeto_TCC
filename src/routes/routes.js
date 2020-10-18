const express = require('express');

// controllers
const usuarioController = require('../controllers/usuarioController');
const admController = require('../controllers/admController');
const incidenteController = require('../controllers/incidenteController');
const sessaoController = require('../controllers/sessaoController');

const routes = express.Router();

// sessão
routes.post('/sessao', sessaoController.login);
// usuario
routes.get('/usuario', usuarioController.pesquisar);
routes.put('/usuario', usuarioController.atualizar);
routes.post('/usuario', usuarioController.criar);
routes.delete('/usuario', usuarioController.deletar);

// administrador
routes.get('/adm', admController.listarAdm);
routes.get('/ticket/:id', admController.buscar);
routes.get('/adm/:status', admController.listarStatus);
routes.put('/adm/:id', admController.encerrar);

// incidentes
routes.post('/incidente', incidenteController.criar);
routes.delete('/incidente/:id', incidenteController.deletar);
routes.get('/incidente/', incidenteController.listar);
routes.get('/incidente/:status/:usuario', incidenteController.listarStatus);
routes.put('/incidente', incidenteController.encerrar);

module.exports = routes;