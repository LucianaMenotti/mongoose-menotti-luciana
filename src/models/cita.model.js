import { model, Schema, Types } from "mongoose";

const citaSchema = new Schema(
  {
    lugar: {
      type: String,
      required: true,
      trim: true,
    },
    fecha: {
      type: Date,
      required: true,
    },
    participantes: [
      {
        type: Types.ObjectId,
        ref: "Gato",
      },
    ],
    activo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const CitaModel = model("Cita", citaSchema);
