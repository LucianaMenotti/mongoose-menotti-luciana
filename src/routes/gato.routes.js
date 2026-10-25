import { Router } from "express";
import {
  createGato,
  deleteGato,
  getAllGatos,
  getGatoById,
  updateGato,
} from "../controllers/gato.controller.js";
import { validar } from "../middlewares/validar.middleware.js";
import { idValidacion } from "../middlewares/id.validaciones.js";
import {
  actualizarGatoValidaciones,
  crearGatoValidaciones,
} from "../middlewares/gato.validaciones.js";

export const gatoRoutes = Router();

gatoRoutes.post("/gatos", crearGatoValidaciones, validar, createGato);

gatoRoutes.get("/gatos", getAllGatos);

gatoRoutes.get("/gatos/:id", idValidacion, validar, getGatoById);

gatoRoutes.put(
  "/gatos/:id",
  idValidacion,
  actualizarGatoValidaciones,
  validar,
  updateGato,
);

gatoRoutes.delete("/gatos/:id", idValidacion, validar, deleteGato);
