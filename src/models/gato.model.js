import { model, Schema, Types } from "mongoose";

const gatoSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    edad: {
      type: Number,
      required: true,
      min: 0,
      max: 30,
    },
    raza: {
      type: String,
      required: true,
      trim: true,
    },
    gustos: {
      comidaFavorita: {
        type: String,
        required: true,
        trim: true,
      },
      pasatiempo: {
        type: String,
        required: true,
        trim: true,
      },
    },
    agencia: {
      type: Types.ObjectId,
      ref: "Agencia",
      required: true,
    },
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

export const GatoModel = model("Gato", gatoSchema);
