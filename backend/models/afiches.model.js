import { connection } from "../database/db.js";

export const getAfiches = async () => {
  const sql = "Select Url_afiche from afiches";
  const [data] = await connection.execute(sql);
  return await data;
};
