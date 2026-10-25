import { matchedData } from "express-validator";
import { CitaModel } from "../models/cita.model.js";

const poblarParticipantes = {
  path: "participantes",
  match: { activo: true },
  select: "nombre raza",
};

export const createCita = async (req, res) => {
  try {
    const { lugar, fecha } = matchedData(req);

    const nuevaCita = await CitaModel.create({ lugar, fecha });

    return res.status(201).json({
      msg: "Cita creada correctamente",
      data: nuevaCita,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

export const getAllCitas = async (req, res) => {
  try {
    const citas = await CitaModel.find({ activo: true }).populate(
      poblarParticipantes,
    );

    return res.status(200).json({
      msg: "Citas obtenidas correctamente",
      data: citas,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

export const getCitaById = async (req, res) => {
  try {
    const { id } = matchedData(req);

    const cita = await CitaModel.findOne({ _id: id, activo: true }).populate(
      poblarParticipantes,
    );

    if (!cita) {
      return res.status(404).json({
        msg: "Cita no encontrada",
      });
    }

    return res.status(200).json({
      msg: "Cita obtenida correctamente",
      data: cita,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

export const updateCita = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });
    const datos = matchedData(req, { locations: ["body"] });

    const citaActualizada = await CitaModel.findOneAndUpdate(
      { _id: id, activo: true },
      datos,
      { returnDocument: "after" },
    ).populate(poblarParticipantes);

    if (!citaActualizada) {
      return res.status(404).json({
        msg: "Cita no encontrada",
      });
    }

    return res.status(200).json({
      msg: "Cita actualizada correctamente",
      data: citaActualizada,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

export const deleteCita = async (req, res) => {
  try {
    const { id } = matchedData(req);

    const citaEliminada = await CitaModel.findOneAndUpdate(
      { _id: id, activo: true },
      { activo: false },
      { returnDocument: "after" },
    );

    if (!citaEliminada) {
      return res.status(404).json({
        msg: "Cita no encontrada",
      });
    }

    return res.status(200).json({
      msg: "Cita eliminada correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

export const agregarParticipante = async (req, res) => {
  try {
    const { id, gato } = matchedData(req);

    const citaActualizada = await CitaModel.findOneAndUpdate(
      { _id: id, activo: true },
      { $push: { participantes: gato } },
      { returnDocument: "after" },
    ).populate(poblarParticipantes);

    if (!citaActualizada) {
      return res.status(404).json({
        msg: "Cita no encontrada",
      });
    }

    return res.status(200).json({
      msg: "Gato agregado a la cita correctamente",
      data: citaActualizada,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};
