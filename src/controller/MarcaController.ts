import type { Request, Response } from "express";
import Marca from "../models/Marca.js";

const getAll = async (_req: Request, res: Response) => { try { res.json(await Marca.findAll()); } catch { res.status(500).json({ message: "Erro ao buscar marcas." }); } };
const getById = async (req: Request<{ id: string }>, res: Response) => { try { res.json(await Marca.findById(req.params.id)); } catch { res.status(500).json({ message: "Erro ao buscar marca." }); } };
const create = async (req: Request, res: Response) => { try { res.status(201).json(await Marca.create(req.body)); } catch { res.status(500).json({ message: "Erro ao criar marca." }); } };
const update = async (req: Request<{ id: string }>, res: Response) => { try { res.json(await Marca.update(req.params.id, req.body)); } catch { res.status(500).json({ message: "Erro ao atualizar marca." }); } };
const remove = async (req: Request<{ id: string }>, res: Response) => { try { await Marca.remove(req.params.id); res.json({ message: "Marca removida com sucesso." }); } catch { res.status(500).json({ message: "Erro ao remover marca." }); } };

export default { getAll, getById, create, update, remove };
