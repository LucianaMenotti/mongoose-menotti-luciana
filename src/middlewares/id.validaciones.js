import { param } from "express-validator";

export const idValidacion = [
  param("id").isMongoId().withMessage("El id no es valido"),
];
