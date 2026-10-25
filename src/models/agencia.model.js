import { model, Schema } from "mongoose";

const agenciaSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    lema: {
      type: String,
      default: "",
    },
    activo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    id: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

agenciaSchema.virtual("gatos", {
  ref: "Gato",
  localField: "_id",
  foreignField: "agencia",
});

export const AgenciaModel = model("Agencia", agenciaSchema);
