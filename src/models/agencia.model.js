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
    //versionKey: false, // Esto evita que se agregue el campo "__v" en los documentos de la colección. El campo "__v" es utilizado internamente por Mongoose para llevar un control de la versión del documento y detectar conflictos de actualización. Al establecer versionKey en false, se desactiva esta funcionalidad y no se incluirá el campo "__v" en los documentos.
  },
);

export const AgenciaModel = model("Agencia", agenciaSchema);
