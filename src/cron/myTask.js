import { actualizarEstado } from "../services/dbquery/queryServices.js";
import cron from "node-cron";
// Ejecuta cada minuto (*/1 * * * *)
///cada 5 min : 5 * * * *
//cada 60 dias: 0 0 1 1,3,5,7,9,11 *
//"0 0 1 * *" cada 30 dias o 1 mes

export const restaurarEnlaces = cron.schedule(
  "0 0 1 * *",
  async () => {
    try {
      console.log("Ejecutando tarea de inactivacion de codigos 30 dias");
      const res = await actualizarEstado();
      console.log(`cantidad de resgistros actualizados ` + res);
    } catch (error) {
      console.log(
        "Ocurrio un error interno al inactivar los codigo de la tabla de enlaces"
      );
      console.log(error);
    }
  },
  {
    scheduled: false, // no se inicia automáticamente, lo controlamos desde index.js
  }
);
