import { AgenciaModel } from "../models/agencia.model.js";

export const createAgencia = async (req, res) => {
  try {
    const { nombre, lema } = req.body;

    const nuevaAgencia = await AgenciaModel.create({ nombre, lema });

    return res.status(201).json({
      msg: "Agencia creada correctamente",
      data: nuevaAgencia,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};