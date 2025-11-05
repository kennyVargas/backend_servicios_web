import { obtenerPDFfoleado } from "../services/pdf/pdfGenerator.js";
import {verficarCaptch} from "../services/captcha/verificadorCaptcha.js"
export const generarPdf = async (req, res) => {
  try {
    const { paginas, posicion, tamano, formato, orden, captcha } = req.body;
    const totalPages = parseInt(paginas) || 1;
    const pos = posicion || "abajo-derecha";
    const fontSize = parseInt(tamano) || 12;

    // Definir tamaño de hoja (carta u oficio)
    let pageWidth = 612; // carta por defecto
    let pageHeight = 792;

    if (formato === "oficio") {
      pageHeight = 936; // mismo ancho, más alto
    }
    if (totalPages <= 0) {
      res.status(500).send("Error al generar PDF");
    }
    if (fontSize <= 7) {
      res.status(500).send("Error en el tamaño de la fuente");
    }
    if (!captcha) {
      return res.status(400).json({ error: "Complete el captcha" });
    }

    const success = await verficarCaptch(captcha);
    if (!success) {
      return res.status(403).json({
        success: false,
        data: null,
        message: "Falló la validación del captcha",
      });
    }

    const pdfBytes = await obtenerPDFfoleado(
      totalPages,
      pos,
      fontSize,
      orden,
      pageWidth,
      pageHeight
    );

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "inline; filename=foleado-formato.pdf"
    );
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=documento.pdf");

    res.send(pdfBytes);
  } catch (error) {
    res.status(500).send("Error erro PDF");
  }
};
