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
        versionKey: false,
        //Versionkey sirve para que no se cree el campo __v en la base de datos
    },
);

export const AgenciaModel= model("agencia", agenciaSchema);