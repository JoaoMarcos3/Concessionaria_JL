import express from "express";
import type { NextFunction, Request, Response } from "express";
import marcaRoutes from "./Routes/marcaRoutes.js";
import veiculoRoutes from "./Routes/veiculoRoutes.js";
import clienteRoutes from "./Routes/clienteRoutes.js";
import vendaRoutes from "./Routes/vendaRoutes.js";

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.use("/marcas", marcaRoutes);
app.use("/veiculos", veiculoRoutes);
app.use("/clientes", clienteRoutes);
app.use("/vendas", vendaRoutes);

app.use((_req: Request, res: Response) => {
    res.status(404).json({ message: "Rota nao encontrada." });
});

app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
    if (error.type === "entity.parse.failed") {
        res.status(400).json({ message: "JSON invalido no corpo da requisicao." });
        return;
    }
    console.error("Erro inesperado: ", error);
    res.status(500).json({ message: "Erro interno do servidor." });
});

export default app;
