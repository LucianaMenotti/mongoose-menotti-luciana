import {model, Schema, Types} from "mongoose";

const agenciaSchema = new Schema(
    {
        nombre:{
            type:String,
            required: true,
            unique: true,
            trim: true,
        },
        lema:{
            type:String,
            default: "",
        },
        activo:{
            type:Boolean,
            default:true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const AgenciaModel= model("agencia", agenciaSchema);