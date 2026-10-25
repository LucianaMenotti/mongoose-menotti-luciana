import { body, param } from "express-validator";
import { CitaModel } from "../models/cita.model.js";
import { GatoModel } from "../models/gato.model.js";

export const crearCitaValidaciones = [
  body("lugar")
    .notEmpty()
    .withMessage("El lugar es obligatorio")
    .bail()
    .isString()
    .withMessage("El lugar debe ser texto")
    .bail()
    .trim()
    .isLength({ min: 3, max: 80 })
    .withMessage("El lugar debe tener entre 3 y 80 caracteres"),
  body("fecha")
    .notEmpty()
    .withMessage("La fecha es obligatoria")
    .bail()
    .isISO8601()
    .withMessage("La fecha debe tener formato AAAA-MM-DD")
    .bail()
    .toDate(),
];

export const actualizarCitaValidaciones = [
  body("lugar")
    .optional()
    .isString()
    .withMessage("El lugar debe ser texto")
    .bail()
    .trim()
    .isLength({ min: 3, max: 80 })
    .withMessage("El lugar debe tener entre 3 y 80 caracteres"),
  body("fecha")
    .optional()
    .isISO8601()
    .withMessage("La fecha debe tener formato AAAA-MM-DD")
    .bail()
    .toDate(),
];

export const agregarParticipanteValidaciones = [
  param("id")
    .isMongoId()
    .withMessage("El id de la cita no es valido")
    .bail()
    .custom(async (valor) => {
      const cita = await CitaModel.findOne({ _id: valor, activo: true });
      if (!cita) {
        throw new Error("La cita no existe");
      }
      return true;
    }),
  body("gato")
    .if(param("id").isMongoId())
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
    .custom(async (valor, { req }) => {
      const repetido = await CitaModel.findOne({
        _id: req.params.id,
        participantes: valor,
      });
      if (repetido) {
        throw new Error("El gato ya participa en esta cita");
      }
      return true;
    }),
];
