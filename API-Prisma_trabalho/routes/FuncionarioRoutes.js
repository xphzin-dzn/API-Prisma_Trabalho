const express = require('express')
const FuncionarioController = require('../controllers/FuncionarioController')

const router = express.Router()
router.get('/funcionario/:id',FuncionarioController.buscaFuncionario)
router.get('/funcionarios',FuncionarioController.listarFuncionarios)
router.post('/funcionario',FuncionarioController.criarFuncionarios)
router.delete('/funcionario/:id', FuncionarioController.deletarFuncionario)
router.put('/funcionario/:id',FuncionarioController.atualizarFuncionario)

module.exports = router
