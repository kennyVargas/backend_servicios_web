import express from "express";
import cors from "cors";
import qrRoutes from "./routes/qr.routes.js";
import cronJobs from "./cron/index.js";

const app = express();
// Middlewares
app.use(cors());
app.use(express.json());

// Iniciar los cron jobs
cronJobs.startAll();
// Rutas
app.use("/api", qrRoutes);

// Ruta raíz para verificar que funciona
app.get("/", (req, res) => {
  res.json({ message: "API de servicios activa ✅" });
});

export default app;
