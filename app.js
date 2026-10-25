import "dotenv/config";
import express from "express";
import { startDB } from "./src/config/database.js";
import { agenciaRoutes } from "./src/routes/agencia.routes.js";
import { gatoRoutes } from "./src/routes/gato.routes.js";
import { collarRoutes } from "./src/routes/collar.routes.js";
const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());

app.use("/api", agenciaRoutes);

app.use("/api", gatoRoutes);

app.use("/api", collarRoutes);

app.listen(PORT, async () => {
  await startDB();
  console.log(`Servidor listo en el puerto ${PORT}`);
});
