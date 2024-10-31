const express = require('express');
const router = express.Router();
const proprietariosController = require('../controllers/proprietariosController');

// CRUD para Proprietários
router.post('/', proprietariosController.createProprietario); // Criar proprietário
router.get('/', proprietariosController.getProprietarios); // Listar todos os proprietários
router.get('/:id', proprietariosController.getProprietario); // Buscar proprietário por ID
router.put('/:id', proprietariosController.updateProprietario); // Atualizar proprietário
router.delete('/:id', proprietariosController.deleteProprietario); // Deletar proprietário
router.get('/search', proprietariosController.searchProprietario); // Pesquisar por nome

module.exports = router;
