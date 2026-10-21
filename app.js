import "dotenv/config";
import express from "express";
import { startDB } from "./src/config/database.js";

const app = express();
const PORT = process.env.PORT || 3003;

app.listen(PORT, async () => {
  await startDB();
  console.log(`Servidor listo en el puerto ${PORT}`);
});
