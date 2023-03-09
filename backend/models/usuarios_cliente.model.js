import { connection } from "../database/db.js";

export const getUsuariosCliente = async () => {
  const usuariosClientes = await connection.query(
    "Select * from usuarios"
  );

  return await usuariosClientes;
};

export const buscarUsuarioCliente = async (Username, Contraseña) => {
  const sql = "SELECT * FROM usuarios u INNER JOIN roles r on r.ID_rol = u.ID_rol WHERE Username = ? and Contraseña = ? and Nombre_rol = ?";
  const [rows] = await connection.execute(sql, [Username, Contraseña, "Cliente"]);
  return await rows;
};
