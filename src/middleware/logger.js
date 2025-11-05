import { guardarApiLogger } from "../services/dbquery/queryServices.js";

export const apiLogger = async (req, res, next) => {
  try {
    const logData = {
      method: req.method,
      url: req.originalUrl || req.url,
      ip: req.ip || req.connection.remoteAddress || "unknown",
      userAgent: req.get("User-Agent") || "unknown",
    };
    await guardarApiLogger(logData);
    console.log("Registro peticion de API exitoso");
    next();
  } catch (err) {
    console.error("Error registrando llamada API:", err);
    next();
  }
};
