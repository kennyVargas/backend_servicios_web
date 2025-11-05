import { pool } from "../../database/conection.js";

export const obtenerEnlaces = async () => {
  const query = `SELECT codigo,original,arcortado 
                   FROM  enlaces`;
  const { rows } = await pool.query(query);
  return rows;
};

export const obtenerEnlacePorClave = async (id) => {
  const query = `SELECT codigo,original,arcortado,fecha_creacion
                 FROM  enlaces 
                 where codigo like $1 
                 AND estado = true`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

export const crearEnlace = async ({ codigo, arcortado, original, estado }) => {
  const query = `
      INSERT INTO enlaces (original,codigo,arcortado,estado)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
  const values = [original, codigo, arcortado, estado];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const eliminarEnlace = async (id) => {
  const query = `
      DELETE FROM enlaces WHERE codigo = $1
    `;
  const { rowCount } = await pool.query(query, [id]);
  return rowCount > 0;
};

export const actualizarEstado = async () => {
  const query = `
    UPDATE enlaces SET estado = false 
    WHERE fecha_creacion <= NOW() - INTERVAL '60 days'
    AND estado = true;
    `;
  const { rowCount } = await pool.query(query);
  return rowCount;
};

export const guardarApiLogger = async ({ method, url, ip, userAgent }) => {
  const query = `
      INSERT INTO peticiones(ruta,metodo,ip_address,agente) 
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
  const values = [url, method, ip, userAgent];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const querysPeticion = (ruta) => {
  const query = `
  select  count(*) as cantidad, ruta
  from peticiones 
  where ruta like '${ruta}'
  and metodo like 'POST'
  group by ruta`;
  return query;
};

export const obtenerCantidadPeticion = async () => {
  const rutas = ["/api/qr", "/api/acortar", "/api/generar-pdf"];

  const peticionesQR = await pool.query(querysPeticion(rutas[0]));
  const peticionesUrl = await pool.query(querysPeticion(rutas[1]));
  const peticionesPdf = await pool.query(querysPeticion(rutas[2]));
  return [peticionesQR.rows[0], peticionesUrl.rows[0], peticionesPdf.rows[0]];
};
