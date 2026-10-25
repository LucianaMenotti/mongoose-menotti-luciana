import { Router } from "express";
import {
  agregarParticipante,
  createCita,
  deleteCita,
  getAllCitas,
  getCitaById,
  updateCita,
} from "../controllers/cita.controller.js";
import { validar } from "../middlewares/validar.middleware.js";
import { idValidacion } from "../middlewares/id.validaciones.js";
import {
  actualizarCitaValidaciones,
  agregarParticipanteValidaciones,
  crearCitaValidaciones,
} from "../middlewares/cita.validaciones.js";

export const citaRoutes = Router();

citaRoutes.post("/citas", crearCitaValidaciones, validar, createCita);

citaRoutes.get("/citas", getAllCitas);

citaRoutes.get("/citas/:id", idValidacion, validar, getCitaById);

citaRoutes.put(
  "/citas/:id",
  idValidacion,
  actualizarCitaValidaciones,
  validar,
  updateCita,
);

citaRoutes.delete("/citas/:id", idValidacion, validar, deleteCita);

citaRoutes.post(
  "/citas/:id/participantes",
  agregarParticipanteValidaciones,
  validar,
  agregarParticipante,
);
