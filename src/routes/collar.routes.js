import { Router } from "express";
import {
  createCollar,
  deleteCollar,
  getAllCollares,
  getCollarById,
  updateCollar,
} from "../controllers/collar.controller.js";
import { validar } from "../middlewares/validar.middleware.js";
import { idValidacion } from "../middlewares/id.validaciones.js";
import {
  actualizarCollarValidaciones,
  crearCollarValidaciones,
} from "../middlewares/collar.validaciones.js";

export const collarRoutes = Router();

collarRoutes.post("/collares", crearCollarValidaciones, validar, createCollar);

collarRoutes.get("/collares", getAllCollares);

collarRoutes.get("/collares/:id", idValidacion, validar, getCollarById);

collarRoutes.put(
  "/collares/:id",
  idValidacion,
  actualizarCollarValidaciones,
  validar,
  updateCollar,
);

collarRoutes.delete("/collares/:id", idValidacion, validar, deleteCollar);
