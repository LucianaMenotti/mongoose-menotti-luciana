import { Router } from "express";
import { createAgencia } from "../controllers/agencia.controller.js";

export const agenciaRouter = Router();

agenciaRouter.post("/agencias", createAgencia);
