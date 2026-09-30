import type { Request, Response } from "express";
import Cliente from "../models/Cliente.js";

const getAll = async (_req: Request, res: Response) => { try { res.json(await Cliente.findAll()); } catch { res.status(500).json({ message: "Erro ao buscar clientes." }); } };
const getById = async (req: Request<{ id: string }>, res: Response) => { try { res.json(await Cliente.findById(req.params.id)); } catch { res.status(500).json({ message: "Erro ao buscar cliente." }); } };
const create = async (req: Request, res: Response) => { try { res.status(201).json(await Cliente.create(req.body)); } catch { res.status(500).json({ message: "Erro ao criar cliente." }); } };
const update = async (req: Request<{ id: string }>, res: Response) => { try { res.json(await Cliente.update(req.params.id, req.body)); } catch { res.status(500).json({ message: "Erro ao atualizar cliente." }); } };
const remove = async (req: Request<{ id: string }>, res: Response) => { try { await Cliente.remove(req.params.id); res.json({ message: "Cliente removido com sucesso." }); } catch { res.status(500).json({ message: "Erro ao remover cliente." }); } };

export default { getAll, getById, create, update, remove };
