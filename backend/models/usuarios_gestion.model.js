import { connection } from "../database/db.js"

export const buscarUsuarioGestion = async (Username, Contraseña) => {
    const sql = "SELECT * from usuarios u INNER JOIN roles r on r.ID_rol = u.ID_rol WHERE Username = ? and Contraseña = ? and Nombre_rol NOT IN (?)"
  const [rows] = await connection.execute(sql, [Username, Contraseña, "Cliente"]);
    return await rows
}