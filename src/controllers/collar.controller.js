import { matchedData } from "express-validator";
import { CollarModel } from "../models/collar.model.js";

export const createCollar = async (req, res) => {
  try {
    const { color, frase, gato } = matchedData(req);

    const nuevoCollar = await CollarModel.create({ color, frase, gato });

    return res.status(201).json({
      msg: "Collar creado correctamente",
      data: nuevoCollar,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

export const getAllCollares = async (req, res) => {
  try {
    const collares = await CollarModel.find({ activo: true }).populate(
      "gato",
      "nombre raza",
    );

    return res.status(200).json({
      msg: "Collares obtenidos correctamente",
      data: collares,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

export const getCollarById = async (req, res) => {
  try {
    const { id } = matchedData(req);

    const collar = await CollarModel.findOne({
      _id: id,
      activo: true,
    }).populate("gato", "nombre raza");

    if (!collar) {
      return res.status(404).json({
        msg: "Collar no encontrado",
      });
    }

    return res.status(200).json({
      msg: "Collar obtenido correctamente",
      data: collar,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

export const updateCollar = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });
    const datos = matchedData(req, { locations: ["body"] });

    const collarActualizado = await CollarModel.findOneAndUpdate(
      { _id: id, activo: true },
      datos,
      { returnDocument: "after" },
    ).populate("gato", "nombre raza");

    if (!collarActualizado) {
      return res.status(404).json({
        msg: "Collar no encontrado",
      });
    }

    return res.status(200).json({
      msg: "Collar actualizado correctamente",
      data: collarActualizado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

export const deleteCollar = async (req, res) => {
  try {
    const { id } = matchedData(req);

    const collarEliminado = await CollarModel.findOneAndUpdate(
      { _id: id, activo: true },
      { activo: false },
      { returnDocument: "after" },
    );

    if (!collarEliminado) {
      return res.status(404).json({
        msg: "Collar no encontrado",
      });
    }

    return res.status(200).json({
      msg: "Collar eliminado correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};
