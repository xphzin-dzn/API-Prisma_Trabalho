const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// CRUD para Proprietários
exports.createProprietario = async (req, res) => {
    try {
        const { nome, email, endereco } = req.body;
        const proprietario = await prisma.proprietario.create({
            data: { nome, email, endereco },
        });
        res.status(201).json(proprietario);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar proprietário' });
    }
};

exports.getProprietarios = async (req, res) => {
    try {
        const proprietarios = await prisma.proprietario.findMany();
        res.json(proprietarios);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar proprietários' });
    }
};

exports.getProprietario = async (req, res) => {
    try {
        const { id } = req.params;
        const proprietario = await prisma.proprietario.findUnique({
            where: { id: Number(id) },
        });
        if (!proprietario) {
            return res.status(404).json({ error: 'Proprietário não encontrado' });
        }
        res.json(proprietario);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar proprietário' });
    }
};

exports.updateProprietario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, endereco } = req.body;
        const proprietario = await prisma.proprietario.update({
            where: { id: Number(id) },
            data: { nome, email, endereco },
        });
        res.json(proprietario);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar proprietário' });
    }
};

exports.deleteProprietario = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.proprietario.delete({
            where: { id: Number(id) },
        });
        res.json({ message: 'Proprietário deletado' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar proprietário' });
    }
};

// Pesquisar proprietário pelo pedaço do nome
exports.searchProprietario = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ error: 'É necessário fornecer um nome para a busca.' });
        }

        const proprietarios = await prisma.proprietario.findMany({
            where: { nome: { contains: name, mode: 'insensitive' } },
        });

        res.json(proprietarios);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar proprietários' });
    }
};
