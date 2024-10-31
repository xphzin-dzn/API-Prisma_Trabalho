const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// CRUD para Produtos
exports.createProduto = async (req, res) => {
    try {
        const { descricao, quantidade, valor, proprietarioId } = req.body;

        const produto = await prisma.produto.create({
            data: {
                descricao,
                quantidade: Number(quantidade),
                valor: parseFloat(valor),
                proprietarioId: Number(proprietarioId),
            },
        });
        res.status(201).json(produto);
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        res.status(500).json({ error: 'Erro ao criar produto' });
    }
};

exports.getProdutos = async (req, res) => {
    const { descricao } = req.query;
    const where = descricao ? { descricao: { contains: descricao } } : {}; // Removido mode: 'insensitive'

    try {
        const produtos = await prisma.produto.findMany({
            where: where,
            include: {
                proprietario: true
            }
        });
        res.json(produtos);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
};

exports.getProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await prisma.produto.findUnique({
            where: { id: Number(id) },
        });

        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        res.json(produto);
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        res.status(500).json({ error: 'Erro ao buscar produto' });
    }
};

exports.updateProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const { descricao, quantidade, valor, proprietarioId } = req.body;

        const produto = await prisma.produto.update({
            where: { id: Number(id) },
            data: {
                descricao,
                quantidade: Number(quantidade),
                valor: parseFloat(valor),
                proprietarioId: Number(proprietarioId),
            }
        });

        res.json(produto);
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
};

exports.deleteProduto = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.produto.delete({
            where: { id: Number(id) },
        });
        res.json({ message: 'Produto deletado' });
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
        res.status(500).json({ error: 'Erro ao deletar produto' });
    }
};

// Pesquisar produto de maior quantidade
exports.searchProdutoMaiorQuantidade = async (req, res) => {
    try {
        const produto = await prisma.produto.findFirst({
            orderBy: { quantidade: 'desc' },
        });
        res.json(produto);
    } catch (error) {
        console.error('Erro ao buscar produto de maior quantidade:', error);
        res.status(500).json({ error: 'Erro ao buscar produto de maior quantidade' });
    }
};

// Pesquisar produto de maior valor
exports.searchProdutoMaiorValor = async (req, res) => {
    try {
        const produto = await prisma.produto.findFirst({
            orderBy: { valor: 'desc' },
        });
        res.json(produto);
    } catch (error) {
        console.error('Erro ao buscar produto de maior valor:', error);
        res.status(500).json({ error: 'Erro ao buscar produto de maior valor' });
    }
};

// Pesquisar produto de maior valor total
exports.searchProdutoMaiorValorTotal = async (req, res) => {
    try {
        const produtos = await prisma.produto.findMany();
        const produtoMaiorValorTotal = produtos.reduce((prev, curr) => {
            const valorTotalPrev = prev.quantidade * prev.valor;
            const valorTotalCurr = curr.quantidade * curr.valor;
            return valorTotalCurr > valorTotalPrev ? curr : prev;
        });
        res.json(produtoMaiorValorTotal);
    } catch (error) {
        console.error('Erro ao buscar produto de maior valor total:', error);
        res.status(500).json({ error: 'Erro ao buscar produto de maior valor total' });
    }
};

// Pesquisar o proprietário com o maior número de produtos
exports.searchProprietarioMaiorNumeroProdutos = async (req, res) => {
    try {
        const proprietarios = await prisma.proprietario.findMany({
            include: { produtos: true },
        });
        const proprietarioComMaisProdutos = proprietarios.reduce((prev, curr) => {
            return curr.produtos.length > prev.produtos.length ? curr : prev;
        });
        res.json(proprietarioComMaisProdutos);
    } catch (error) {
        console.error('Erro ao buscar proprietário com maior número de produtos:', error);
        res.status(500).json({ error: 'Erro ao buscar proprietário com maior número de produtos' });
    }
};

// No seu controller de produtos
exports.getProprietarios = async (req, res) => {
    try {
        const proprietarios = await prisma.proprietario.findMany();
        res.json(proprietarios);
    } catch (error) {
        console.error('Erro ao buscar proprietários:', error);
        res.status(500).json({ error: 'Erro ao buscar proprietários' });
    }
};
