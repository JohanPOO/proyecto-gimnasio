import { connection } from "../database/db.js";

export const getGeneros = async () => {
  const sql = "Select * from generos";

  const [data] = await connection.execute(sql);
  return await data;
};
