import { body } from "express-validator";
import { GatoModel } from "../models/gato.model.js";
import { CollarModel } from "../models/collar.model.js";

export const crearCollarValidaciones = [
  body("color")
    .notEmpty()
    .withMessage("El color es obligatorio")
    .bail()
    .isString()
    .withMessage("El color debe ser texto")
    .bail()
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("El color debe tener entre 3 y 30 caracteres"),
  body("frase")
    .notEmpty()
    .withMessage("La frase es obligatoria")
    .bail()
    .isString()
    .withMessage("La frase debe ser texto")
    .bail()
    .trim()
    .isLength({ min: 3, max: 60 })
    .withMessage("La frase debe tener entre 3 y 60 caracteres"),
  body("gato")
    .notEmpty()
    .withMessage("El gato es obligatorio")
    .bail()
    .isMongoId()
    .withMessage("El id del gato no es valido")
    .bail()
    .custom(async (valor) => {
      const gato = await GatoModel.findOne({ _id: valor, activo: true });
      if (!gato) {
        throw new Error("El gato no existe");
      }
      return true;
    })
    .bail()
    .custom(async (valor) => {
      const collar = await CollarModel.findOne({ gato: valor });
      if (collar) {
        throw new Error("El gato ya tiene un collar");
      }
      return true;
    }),
];

export const actualizarCollarValidaciones = [
  body("color")
    .optional()
    .isString()
    .withMessage("El color debe ser texto")
    .bail()
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("El color debe tener entre 3 y 30 caracteres"),
  body("frase")
    .optional()
    .isString()
    .withMessage("La frase debe ser texto")
    .bail()
    .trim()
    .isLength({ min: 3, max: 60 })
    .withMessage("La frase debe tener entre 3 y 60 caracteres"),
];
