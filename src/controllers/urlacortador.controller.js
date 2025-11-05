import {
  obtenerEnlacePorClave,
  crearEnlace,
} from "../services/dbquery/queryServices.js";
import {
  generarCodigo,
  generarEnlaceAcortado,
} from "../services/acortador/acortadorServices.js";
import { Enlace } from "../database/dto/enlace.js";
import { verficarCaptch } from "../services/captcha/verificadorCaptcha.js";

export const acortarEnlace = (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  return res.json({
    success: true,
    data: process.env.RECAPTCHA_SITE_KEY,
    message: "Respuesta exitosa",
  });
};

export const verificarCodigo = async (req, res) => {
  const { codigo } = req.body;
  if (!codigo) {
    return res.status(400).json({ error: "Codigo requerido" });
  }
  const clave = codigo.toUpperCase();
  try {
    const row = await obtenerEnlacePorClave(clave);

    if (!row) {
      return res.json({
        success: false,
        data: true,
        message: "Codigo inexistente",
      });
    }
    return res.json({
      success: true,
      data: false,
      message: "El código se encuentra en uso",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: null,
      message: "Ocurrio un error interno",
    });
  }
};

export const obtenerEnlaceAcortado = async (req, res) => {
  const { codigo, captcha } = req.body;
  if (!codigo) {
    return res.status(400).json({ error: "Codigo requerido" });
  }
  const clave = codigo.toUpperCase();
  try {
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

    const row = await obtenerEnlacePorClave(clave);

    if (!row) {
      return res.json({
        success: false,
        data: null,
        message: "Codigo inexistente",
      });
    }
    return res.json({
      success: true,
      data: row,
      message: "Respuesta exitosa",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: null,
      message: "Ocurrio un error interno",
    });
  }
};

export const crearEnlaceAcortado = async (req, res) => {
  const { codigo, original, captcha } = req.body;
  if (!original)
    return res.status(400).json({ error: 'El campo "url" es requerido' });

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
  let clave = !codigo || codigo === "" ? generarCodigo() : codigo.toUpperCase();

  const row = await obtenerEnlacePorClave(clave);

  if (row) {
    return res.json({
      success: false,
      data: null,
      message: "El codigo introducido ya se encuentra en uso.",
    });
  }
  const urlcorta = generarEnlaceAcortado(clave);
  const enlace = new Enlace(clave, original, urlcorta, true);

  try {
    const data = await crearEnlace(enlace);
    const respuesta = {
      arcortado: data.arcortado,
      codigo: data.codigo,
      original,
    };
    return res.json({
      success: true,
      data: respuesta,
      message: "Acortador generado exitosamente",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      data: null,
      message: "Ocurrio un error al insertar el dato",
    });
  }
};
