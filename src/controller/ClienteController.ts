import type { Request, Response } from "express";
import Cliente from "../models/Cliente.js";
import Validacao from "../utils/validacao.js";

const getAll = async (_req: Request, res: Response) => { try { res.json(await Cliente.findAll()); } catch { res.status(500).json({ message: "Erro ao buscar clientes." }); } };
const getById = async (req: Request<{ id: string }>, res: Response) => { if (!Validacao.isUuid(req.params.id)) return void res.status(400).json({ message: "Id invalido." }); try { const item = await Cliente.findById(req.params.id); if (!item) return void res.status(404).json({ message: "Cliente nao encontrado." }); res.json(item); } catch { res.status(500).json({ message: "Erro ao buscar cliente." }); } };
const create = async (req: Request, res: Response) => { const { nome, email, cpf } = req.body; if (!nome || typeof nome !== "string" || !nome.trim()) return void res.status(400).json({ message: "O nome do cliente e obrigatorio." }); if (email && (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) return void res.status(400).json({ message: "Email invalido." }); if (cpf && (typeof cpf !== "string" || cpf.replace(/\D/g, "").length !== 11)) return void res.status(400).json({ message: "CPF invalido. Informe os 11 numeros." }); try { res.status(201).json(await Cliente.create({ ...req.body, nome: nome.trim() })); } catch { res.status(500).json({ message: "Erro ao criar cliente." }); } };
const update = async (req: Request<{ id: string }>, res: Response) => { try { res.json(await Cliente.update(req.params.id, req.body)); } catch { res.status(500).json({ message: "Erro ao atualizar cliente." }); } };
const remove = async (req: Request<{ id: string }>, res: Response) => { try { await Cliente.remove(req.params.id); res.json({ message: "Cliente removido com sucesso." }); } catch { res.status(500).json({ message: "Erro ao remover cliente." }); } };

export default { getAll, getById, create, update, remove };
