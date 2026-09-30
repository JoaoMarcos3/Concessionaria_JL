import type { Request, Response } from "express";
import Venda from "../models/Venda.js";
import Veiculo from "../models/Veiculo.js";
import Cliente from "../models/Cliente.js";
import Validacao from "../utils/validacao.js";

const getAll = async (_req: Request, res: Response) => { try { res.json(await Venda.findAll()); } catch { res.status(500).json({ message: "Erro ao buscar vendas." }); } };
const getById = async (req: Request<{ id: string }>, res: Response) => { try { res.json(await Venda.findById(req.params.id)); } catch { res.status(500).json({ message: "Erro ao buscar venda." }); } };
const create = async (req: Request, res: Response) => { const { veiculo_id, cliente_id, vendedor, preco_venda, status } = req.body; if (!Validacao.isUuid(veiculo_id) || !Validacao.isUuid(cliente_id)) return void res.status(400).json({ message: "veiculo_id ou cliente_id invalido." }); if (typeof vendedor !== "string" || !vendedor.trim() || typeof preco_venda !== "number" || preco_venda <= 0 || (status !== undefined && !["pendente", "concluida", "cancelada"].includes(status))) return void res.status(400).json({ message: "Dados da venda invalidos." }); try { if (!await Veiculo.findById(veiculo_id)) return void res.status(400).json({ message: "O veiculo informado nao existe." }); if (!await Cliente.findById(cliente_id)) return void res.status(400).json({ message: "O cliente informado nao existe." }); res.status(201).json(await Venda.create({ ...req.body, vendedor: vendedor.trim() })); } catch { res.status(500).json({ message: "Erro ao criar venda." }); } };
const update = async (req: Request<{ id: string }>, res: Response) => { try { res.json(await Venda.update(req.params.id, req.body)); } catch { res.status(500).json({ message: "Erro ao atualizar venda." }); } };
const remove = async (req: Request<{ id: string }>, res: Response) => { try { await Venda.remove(req.params.id); res.json({ message: "Venda removida com sucesso." }); } catch { res.status(500).json({ message: "Erro ao remover venda." }); } };

export default { getAll, getById, create, update, remove };
