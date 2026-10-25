import { model, Schema, Types } from "mongoose";

const collarSchema = new Schema(
  {
    color: {
      type: String,
      required: true,
      trim: true,
    },
    frase: {
      type: String,
      required: true,
      trim: true,
    },
    gato: {
      type: Types.ObjectId,
      ref: "Gato",
      required: true,
      unique: true,
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

export const CollarModel = model("Collar", collarSchema);
