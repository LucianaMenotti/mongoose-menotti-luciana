import { matchedData } from "express-validator";
import { AgenciaModel } from "../models/agencia.model.js";

export const createAgencia = async (req, res) => {
  try {
    const { nombre, lema } = matchedData(req);

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

export const getAllAgencias = async (req, res) => {
  try {
    const agencias = await AgenciaModel.find({ activo: true });

    return res.status(200).json({
      msg: "Agencias obtenidas correctamente",
      data: agencias,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

export const getAgenciaById = async (req, res) => {
  try {
    const { id } = matchedData(req);

    const agencia = await AgenciaModel.findOne({
      _id: id,
      activo: true,
    });

    if (!agencia) {
      return res.status(404).json({
        msg: "Agencia no encontrada",
      });
    }

    return res.status(200).json({
      msg: "Agencia obtenida correctamente",
      data: agencia,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

export const updateAgencia = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });
    const datos = matchedData(req, { locations: ["body"] });

    const agenciaActualizada = await AgenciaModel.findOneAndUpdate(
      { _id: id, activo: true },
      datos,
      { returnDocument: "after" },
    );

    if (!agenciaActualizada) {
      return res.status(404).json({
        msg: "Agencia no encontrada",
      });
    }

    return res.status(200).json({
      msg: "Agencia actualizada correctamente",
      data: agenciaActualizada,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

export const deleteAgencia = async (req, res) => {
  try {
    const { id } = matchedData(req);

    const agenciaEliminada = await AgenciaModel.findOneAndUpdate(
      { _id: id, activo: true },
      { activo: false },
      { returnDocument: "after" },
    );

    if (!agenciaEliminada) {
      return res.status(404).json({
        msg: "Agencia no encontrada",
      });
    }

    return res.status(200).json({
      msg: "Agencia eliminada correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};
