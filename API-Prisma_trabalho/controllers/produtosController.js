const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// CRUD para Produtos
// CRUD para Produtos
exports.createProduto = async (req, res) => {
    const { descricao, quantidade, valor, proprietarioId } = req.body;

    // Converte os valores para os tipos corretos
    const produto = await prisma.produto.create({
        data: {
            descricao,
            quantidade: Number(quantidade), // Converte para número inteiro
            valor: parseFloat(valor),        // Converte para número decimal
            proprietarioId: Number(proprietarioId), // Converte para número
        },
    });
    res.json(produto);
};


exports.getProdutos = async (req, res) => {
    try {
        const produtos = await prisma.produto.findMany({
            include: {
                proprietario: true, // Inclui os dados do proprietário
            },
        });
        res.json(produtos);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).send('Erro ao buscar produtos');
    }
};

exports.getProduto = async (req, res) => {
    const { id } = req.params;
    const produto = await prisma.produto.findUnique({
        where: { id: Number(id) },
    });
    res.json(produto);
};

exports.updateProduto = async (req, res) => {
    const { id } = req.params;
    const { descricao, quantidade, valor, proprietarioId } = req.body; // Incluindo proprietarioId

    // Certifique-se de converter quantidade e valor para os tipos corretos
    const produto = await prisma.produto.update({
        where: { id: Number(id) }, // Convertendo o ID para Number
        data: {
            descricao,
            quantidade: Number(quantidade), // Convertendo para Number
            valor: parseFloat(valor), // Convertendo para Float
            proprietarioId: Number(proprietarioId) // Convertendo para Number, se necessário
        }
    });

    res.json(produto);
};

exports.deleteProduto = async (req, res) => {
    const { id } = req.params;
    await prisma.produto.delete({
        where: { id: Number(id) },
    });
    res.json({ message: 'Produto deletado' });
};

// Pesquisar produto de maior quantidade
exports.searchProdutoMaiorQuantidade = async (req, res) => {
    const produto = await prisma.produto.findFirst({
        orderBy: { quantidade: 'desc' },
    });
    res.json(produto);
};

// Pesquisar produto de maior valor
exports.searchProdutoMaiorValor = async (req, res) => {
    const produto = await prisma.produto.findFirst({
        orderBy: { valor: 'desc' },
    });
    res.json(produto);
};

// Pesquisar produto de maior valor total
exports.searchProdutoMaiorValorTotal = async (req, res) => {
    const produtos = await prisma.produto.findMany();
    const produtoMaiorValorTotal = produtos.reduce((prev, curr) => {
        const valorTotalPrev = prev.quantidade * prev.valor;
        const valorTotalCurr = curr.quantidade * curr.valor;
        return valorTotalCurr > valorTotalPrev ? curr : prev;
    });
    res.json(produtoMaiorValorTotal);
};

// Pesquisar o proprietário com o maior número de produtos
exports.searchProprietarioMaiorNumeroProdutos = async (req, res) => {
    const proprietarios = await prisma.proprietario.findMany({
        include: { produtos: true },
    });
    const proprietarioComMaisProdutos = proprietarios.reduce((prev, curr) => {
        return curr.produtos.length > prev.produtos.length ? curr : prev;
    });
    res.json(proprietarioComMaisProdutos);
};
// No seu controller de produtos
exports.getProprietarios = async (req, res) => {
    const proprietarios = await prisma.proprietario.findMany();
    res.json(proprietarios);
};

