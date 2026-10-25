import { validationResult } from "express-validator";

export const validar = (req, res, next) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({
      msg: "Errores de validacion",
      errores: errores.array(),
    });
  }

  next();
};
