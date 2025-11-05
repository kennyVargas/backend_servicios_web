import { obtenerCantidadPeticion } from "../services/dbquery/queryServices.js";

export const obtenerCantidadPeticiones = async (req, res) => {
  try {
    const repuesta = await obtenerCantidadPeticion();
    return res.status(200).json({
      success: false,
      data: repuesta,
      message: "Respuesta exitosa",
    });
  } catch (error) {
    console.log("Ocurrio un error aqui");
    console.log(error);
    return res.status(403).json({
      success: false,
      data: null,
      message: "Falló la consulta",
    });
  }
};
