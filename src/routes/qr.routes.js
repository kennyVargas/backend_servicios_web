import { Router } from "express";
import { generateQR, obtenerClaveWeb } from "../controllers/qr.controller.js";
import { generarPdf } from "../controllers/pdf.controller.js";
import {
  crearEnlaceAcortado,
  obtenerEnlaceAcortado,
  verificarCodigo,
} from "../controllers/urlacortador.controller.js";

import { apiLogger } from "../middleware/logger.js";
import { obtenerCantidadPeticiones } from "../controllers/peticionApi.controller.js";

const router = Router();
router.get("/captcha", obtenerClaveWeb); // GET /api/captcha

router.post("/qr", apiLogger, generateQR); // POST /api/qr
router.post("/generar-pdf", apiLogger, generarPdf);
router.post("/acortar", apiLogger, crearEnlaceAcortado);
router.post("/buscar-url", obtenerEnlaceAcortado);
router.post("/verificar-codigo", verificarCodigo);
router.get("/cantidad-peticiones-api", obtenerCantidadPeticiones);
export default router;
