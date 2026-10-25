import { Router } from "express";
import {
  createAgencia,
  deleteAgencia,
  getAgenciaById,
  getAllAgencias,
  updateAgencia,
} from "../controllers/agencia.controller.js";
import { validar } from "../middlewares/validar.middleware.js";
import { idValidacion } from "../middlewares/id.validaciones.js";
import {
  actualizarAgenciaValidaciones,
  crearAgenciaValidaciones,
} from "../middlewares/agencia.validaciones.js";

export const agenciaRoutes = Router();

agenciaRoutes.post(
  "/agencias",
  crearAgenciaValidaciones,
  validar,
  createAgencia,
);

agenciaRoutes.get("/agencias", getAllAgencias);

agenciaRoutes.get("/agencias/:id", idValidacion, validar, getAgenciaById);

agenciaRoutes.put(
  "/agencias/:id",
  idValidacion,
  actualizarAgenciaValidaciones,
  validar,
  updateAgencia,
);

agenciaRoutes.delete("/agencias/:id", idValidacion, validar, deleteAgencia);
