import type { Request, Response } from "express";
import Marca from "../models/Marca.js";
import Validacao from "../utils/validacao.js";

function validarMarca(body: any): string | null {
    const { nome, pais, ativo } = body;
    if (!nome || typeof nome !== "string" || !nome.trim()) return "O nome da marca e obrigatorio.";
    if (nome.length > 100) return "O nome da marca deve ter no maximo 100 caracteres.";
    if (!Validacao.isTextoOpcional(pais)) return "O pais deve ser um texto.";
    if (!Validacao.isBooleanOpcional(ativo)) return "O campo ativo deve ser true ou false.";
    return null;
}

async function getAll(_req: Request, res: Response) {
    try { res.status(200).json(await Marca.findAll()); } catch (error) { console.error("Erro ao buscar marcas: ", error); res.status(500).json({ message: "Erro ao buscar marcas." }); }
}
async function getById(req: Request<{ id: string }>, res: Response) {
    if (!Validacao.isUuid(req.params.id)) return void res.status(400).json({ message: "Id invalido." });
    try { const marca = await Marca.findById(req.params.id); if (!marca) return void res.status(404).json({ message: "Marca nao encontrada." }); res.status(200).json(marca); } catch (error) { console.error("Erro ao buscar marca: ", error); res.status(500).json({ message: "Erro ao buscar marca." }); }
}
async function create(req: Request, res: Response) {
    const erro = validarMarca(req.body); if (erro) return void res.status(400).json({ message: erro }); const { nome, pais, ativo } = req.body;
    try { res.status(201).json(await Marca.create({ nome: nome.trim(), pais, ativo })); } catch (error) { console.error("Erro ao criar marca: ", error); res.status(500).json({ message: "Erro ao criar marca." }); }
}
async function update(req: Request<{ id: string }>, res: Response) {
    if (!Validacao.isUuid(req.params.id)) return void res.status(400).json({ message: "Id invalido." }); const erro = validarMarca(req.body); if (erro) return void res.status(400).json({ message: erro }); const { nome, pais, ativo } = req.body;
    try { if (!await Marca.findById(req.params.id)) return void res.status(404).json({ message: "Marca nao encontrada." }); res.status(200).json(await Marca.update(req.params.id, { nome: nome.trim(), pais, ativo })); } catch (error) { console.error("Erro ao atualizar marca: ", error); res.status(500).json({ message: "Erro ao atualizar marca." }); }
}
async function remove(req: Request<{ id: string }>, res: Response) {
    if (!Validacao.isUuid(req.params.id)) return void res.status(400).json({ message: "Id invalido." });
    try { if (!await Marca.findById(req.params.id)) return void res.status(404).json({ message: "Marca nao encontrada." }); await Marca.remove(req.params.id); res.status(200).json({ message: "Marca removida com sucesso." }); } catch (error) { if (Validacao.isErroChaveEstrangeira(error)) return void res.status(409).json({ message: "Nao e possivel remover a marca porque existem veiculos cadastrados nela." }); console.error("Erro ao remover marca: ", error); res.status(500).json({ message: "Erro ao remover marca." }); }
}
export default { getAll, getById, create, update, remove };
