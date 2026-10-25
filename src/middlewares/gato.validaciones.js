import { body } from "express-validator";
import { AgenciaModel } from "../models/agencia.model.js";

const agenciaExiste = async (valor) => {
  const agencia = await AgenciaModel.findOne({ _id: valor, activo: true });
  if (!agencia) {
    throw new Error("La agencia no existe");
  }
  return true;
};

export const crearGatoValidaciones = [
  body("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .bail()
    .isString()
    .withMessage("El nombre debe ser texto")
    .bail()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres"),
  body("edad")
    .notEmpty()
    .withMessage("La edad es obligatoria")
    .bail()
    .isInt({ min: 0, max: 30 })
    .withMessage("La edad debe ser un numero entero entre 0 y 30"),
  body("raza")
    .notEmpty()
    .withMessage("La raza es obligatoria")
    .bail()
    .isString()
    .withMessage("La raza debe ser texto")
    .bail()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("La raza debe tener entre 3 y 50 caracteres"),
  body("gustos.comidaFavorita")
    .notEmpty()
    .withMessage("La comida favorita es obligatoria")
    .bail()
    .isString()
    .withMessage("La comida favorita debe ser texto")
    .bail()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("La comida favorita debe tener entre 3 y 50 caracteres"),
  body("gustos.pasatiempo")
    .notEmpty()
    .withMessage("El pasatiempo es obligatorio")
    .bail()
    .isString()
    .withMessage("El pasatiempo debe ser texto")
    .bail()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("El pasatiempo debe tener entre 3 y 50 caracteres"),
  body("agencia")
    .notEmpty()
    .withMessage("La agencia es obligatoria")
    .bail()
    .isMongoId()
    .withMessage("El id de la agencia no es valido")
    .bail()
    .custom(agenciaExiste),
];

export const actualizarGatoValidaciones = [
  body("nombre")
    .optional()
    .isString()
    .withMessage("El nombre debe ser texto")
    .bail()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres"),
  body("edad")
    .optional()
    .isInt({ min: 0, max: 30 })
    .withMessage("La edad debe ser un numero entero entre 0 y 30"),
  body("raza")
    .optional()
    .isString()
    .withMessage("La raza debe ser texto")
    .bail()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("La raza debe tener entre 3 y 50 caracteres"),
  body("gustos")
    .optional()
    .isObject()
    .withMessage("Los gustos deben ser un objeto")
    .bail()
    .custom((valor) => {
      if (!valor.comidaFavorita || !valor.pasatiempo) {
        throw new Error(
          "Los gustos deben incluir la comida favorita y el pasatiempo",
        );
      }
      return true;
    }),
  body("gustos.comidaFavorita")
    .optional()
    .isString()
    .withMessage("La comida favorita debe ser texto")
    .bail()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("La comida favorita debe tener entre 3 y 50 caracteres"),
  body("gustos.pasatiempo")
    .optional()
    .isString()
    .withMessage("El pasatiempo debe ser texto")
    .bail()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("El pasatiempo debe tener entre 3 y 50 caracteres"),
  body("agencia")
    .optional()
    .isMongoId()
    .withMessage("El id de la agencia no es valido")
    .bail()
    .custom(agenciaExiste),
];
