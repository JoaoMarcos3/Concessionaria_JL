import type { Request, Response } from "express";
import Veiculo from "../models/Veiculo.js";

const getAll = async (req: Request, res: Response) => { try { res.json(await Veiculo.findAll(req.query as { marca_id?: string; disponivel?: boolean; busca?: string; ordenar?: string })); } catch { res.status(500).json({ message: "Erro ao buscar veiculos." }); } };
const getById = async (req: Request<{ id: string }>, res: Response) => { try { res.json(await Veiculo.findById(req.params.id)); } catch { res.status(500).json({ message: "Erro ao buscar veiculo." }); } };
const create = async (req: Request, res: Response) => { try { res.status(201).json(await Veiculo.create(req.body)); } catch { res.status(500).json({ message: "Erro ao criar veiculo." }); } };
const update = async (req: Request<{ id: string }>, res: Response) => { try { res.json(await Veiculo.update(req.params.id, req.body)); } catch { res.status(500).json({ message: "Erro ao atualizar veiculo." }); } };
const remove = async (req: Request<{ id: string }>, res: Response) => { try { await Veiculo.remove(req.params.id); res.json({ message: "Veiculo removida com sucesso." }); } catch { res.status(500).json({ message: "Erro ao remover veiculo." }); } };

export default { getAll, getById, create, update, remove };
