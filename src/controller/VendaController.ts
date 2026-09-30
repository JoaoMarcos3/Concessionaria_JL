import type { Request, Response } from "express";
import Venda from "../models/Venda.js";

const getAll = async (_req: Request, res: Response) => { try { res.json(await Venda.findAll()); } catch { res.status(500).json({ message: "Erro ao buscar vendas." }); } };
const getById = async (req: Request<{ id: string }>, res: Response) => { try { res.json(await Venda.findById(req.params.id)); } catch { res.status(500).json({ message: "Erro ao buscar venda." }); } };
const create = async (req: Request, res: Response) => { try { res.status(201).json(await Venda.create(req.body)); } catch { res.status(500).json({ message: "Erro ao criar venda." }); } };
const update = async (req: Request<{ id: string }>, res: Response) => { try { res.json(await Venda.update(req.params.id, req.body)); } catch { res.status(500).json({ message: "Erro ao atualizar venda." }); } };
const remove = async (req: Request<{ id: string }>, res: Response) => { try { await Venda.remove(req.params.id); res.json({ message: "Venda removida com sucesso." }); } catch { res.status(500).json({ message: "Erro ao remover venda." }); } };

export default { getAll, getById, create, update, remove };
