import { connection } from "../database/db.js";

export const getClientes = async () => {
  /*
  const sql =
    "Select c.*, u.ID_rol, u.Username, u.Estado_usuario,m.Estado_membresia " +
    "from usuarios u INNER JOIN clientes c on u.ID_usuario = c.ID_usuario inner join membresias m on m.ID_cliente = c.ID_cliente";
  */
  const sql =
    "Select c.*, u.ID_rol, u.Username, u.Estado_usuario, m.ID_memb, m.Estado_membresia, t.Precio, t.Descripcion from usuarios u INNER JOIN clientes c on u.ID_usuario = c.ID_usuario inner join membresias m on m.ID_cliente = c.ID_cliente inner join tipo_membresias t on t.ID_tip_memb = m.ID_tip_memb";
  const [results] = await connection.execute(sql);
  return results;
};

export const getByIdCliente = async ({ id }) => {
  const sql =
    "Select c.*, u.ID_rol, u.Username, u.Estado_usuario from usuarios u INNER JOIN clientes c on u.ID_usuario = c.ID_usuario Where c.ID_usuario = ?";
  const [rows] = await connection.execute(sql, [id]);

  return await rows;
};

export const buscarUsuarioCliente = async (Username, Contraseña) => {
  const sql =
    "SELECT * FROM usuarios u INNER JOIN roles r on r.ID_rol = u.ID_rol WHERE Username = ? and Contraseña = ? and Nombre_rol = ?";
  const [rows] = await connection.execute(sql, [
    Username,
    Contraseña,
    "Cliente",
  ]);

  return await rows;
};

export const getByEmail = async ({ correo }) => {
  const sql = "Select ID_usuario from clientes Where Correo_electronico = ?";
  const [results] = await connection.execute(sql, [correo]);
  return results;
};

export const UpdateContraseña = async ({ id, password }) => {
  const sql = "Update usuarios SET Contraseña=? Where ID_usuario =?";
  const [result] = await connection.execute(sql, [password, id]);
  return result;
};
