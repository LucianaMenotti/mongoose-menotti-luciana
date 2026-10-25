import "dotenv/config";
import express from "express";
import { startDB } from "./src/config/database.js";
import { agenciaRoutes } from "./src/routes/agencia.routes.js";

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());

app.use("/api", agenciaRoutes);

app.listen(PORT, async () => {
  await startDB();
  console.log(`Servidor listo en el puerto ${PORT}`);
});
