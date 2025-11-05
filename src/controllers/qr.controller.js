import { verficarCaptch } from "../services/captcha/verificadorCaptcha.js";
import { generateQRDataUrl } from "../services/qr/qrGenerator.js";

export const obtenerClaveWeb = (req, res) => {
  return res.json({
    success: true,
    data: process.env.RECAPTCHA_SITE_KEY,
    message: "Respuesta exitosa",
  });
};

export const generateQR = async (req, res) => {
  try {
    const { url, captcha } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'El campo "url" es requerido' });
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
    const qr = await generateQRDataUrl(url);
    // Genera el QR como Data URL (base64)
    return res.json({
      success: true,
      data: qr,
      message: "QR generado exitosamente",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: null,
      message: "Error interno al generar el QR",
    });
  }
};
