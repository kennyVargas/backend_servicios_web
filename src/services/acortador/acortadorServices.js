import { nanoid } from "nanoid";

export const generarCodigo = () => {
  const clave = nanoid(8);
  return clave.toUpperCase();
};

export const generarEnlaceAcortado = (codigo) => {
  const base = "https://FCPN.EDU.BO/E/";
  const enlace = `${base}${codigo}`;
  return enlace;
};
