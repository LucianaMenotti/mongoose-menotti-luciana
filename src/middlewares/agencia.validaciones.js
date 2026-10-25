import { body } from "express-validator";
import { AgenciaModel } from "../models/agencia.model.js";

const lemaValidacion = body("lema")
  .optional()
  .isString()
  .withMessage("El lema debe ser texto")
  .bail()
  .trim()
  .isLength({ max: 100 })
  .withMessage("El lema puede tener hasta 100 caracteres");

export const crearAgenciaValidaciones = [
  body("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .bail()
    .isString()
    .withMessage("El nombre debe ser texto")
    .bail()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("El nombre debe tener entre 3 y 50 caracteres")
    .bail()
    .custom(async (valor) => {
      const existe = await AgenciaModel.findOne({ nombre: valor });
      if (existe) {
        throw new Error("Ya existe una agencia con ese nombre");
      }
      return true;
    }),
  lemaValidacion,
];

export const actualizarAgenciaValidaciones = [
  body("nombre")
    .optional()
    .isString()
    .withMessage("El nombre debe ser texto")
    .bail()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("El nombre debe tener entre 3 y 50 caracteres")
    .bail()
    .custom(async (valor, { req }) => {
      const existe = await AgenciaModel.findOne({ nombre: valor });
      if (existe && existe._id.toString() !== req.params.id) {
        throw new Error("Ya existe una agencia con ese nombre");
      }
      return true;
    }),
  lemaValidacion,
];
