import { matchedData } from "express-validator";
import { GatoModel } from "../models/gato.model.js";

export const createGato = async (req, res) => {
  try {
    const { nombre, edad, raza, gustos, agencia } = matchedData(req);

    const nuevoGato = await GatoModel.create({
      nombre,
      edad,
      raza,
      gustos,
      agencia,
    });

    return res.status(201).json({
      msg: "Gato creado correctamente",
      data: nuevoGato,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

export const getAllGatos = async (req, res) => {
  try {
    const gatos = await GatoModel.find({ activo: true }).populate(
      "agencia",
      "nombre lema",
    );

    return res.status(200).json({
      msg: "Gatos obtenidos correctamente",
      data: gatos,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

export const getGatoById = async (req, res) => {
  try {
    const { id } = matchedData(req);

    const gato = await GatoModel.findOne({
      _id: id,
      activo: true,
    }).populate("agencia", "nombre lema");

    if (!gato) {
      return res.status(404).json({
        msg: "Gato no encontrado",
      });
    }

    return res.status(200).json({
      msg: "Gato obtenido correctamente",
      data: gato,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

export const updateGato = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });
    const datos = matchedData(req, { locations: ["body"] });

    const gatoActualizado = await GatoModel.findOneAndUpdate(
      { _id: id, activo: true },
      datos,
      { returnDocument: "after" },
    ).populate("agencia", "nombre lema");

    if (!gatoActualizado) {
      return res.status(404).json({
        msg: "Gato no encontrado",
      });
    }

    return res.status(200).json({
      msg: "Gato actualizado correctamente",
      data: gatoActualizado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

export const deleteGato = async (req, res) => {
  try {
    const { id } = matchedData(req);

    const gatoEliminado = await GatoModel.findOneAndUpdate(
      { _id: id, activo: true },
      { activo: false },
      { returnDocument: "after" },
    );

    if (!gatoEliminado) {
      return res.status(404).json({
        msg: "Gato no encontrado",
      });
    }

    return res.status(200).json({
      msg: "Gato eliminado correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};
