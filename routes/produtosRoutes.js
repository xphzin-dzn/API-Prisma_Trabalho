const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController');

// CRUD para Produtos
router.post('/', produtosController.createProduto); // Criar produto
router.get('/', produtosController.getProdutos); // Listar todos os produtos
router.get('/:id', produtosController.getProduto); // Buscar produto por ID
router.put('/:id', produtosController.updateProduto); // Atualizar produto
router.delete('/:id', produtosController.deleteProduto); // Deletar produto
router.get('/maior-quantidade', produtosController.searchProdutoMaiorQuantidade); // Buscar produto de maior quantidade
router.get('/maior-valor', produtosController.searchProdutoMaiorValor); // Buscar produto de maior valor
router.get('/maior-valor-total', produtosController.searchProdutoMaiorValorTotal); // Buscar produto com maior valor total
router.get('/proprietario-maior-produtos', produtosController.searchProprietarioMaiorNumeroProdutos); // Proprietário com mais produtos

module.exports = router;
