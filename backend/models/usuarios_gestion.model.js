import { connection } from "../database/db.js";

export const getUsuariosGestion = async () => {
  const sql =
    "Select * from empleados e " +
    "inner join usuarios u on e.ID_usuario = u.ID_usuario inner join roles r on u.ID_rol = r.ID_rol";
  const [result] = await connection.execute(sql);
  return result;
};

export const getByIdUsuarioGestion = async (id) => {
  const sql = "Select * from usuarios Where ID_usuario=?";
  const [data] = await connection.execute(sql, [id]);
  return await data;
};

export const buscarUsuarioGestion = async (Username, Contraseña) => {
  const sql =
    "SELECT * from usuarios u INNER JOIN roles r on r.ID_rol = u.ID_rol WHERE Username = ? and Contraseña = ? and Nombre_rol NOT IN (?) and Estado_usuario=?";
  const [rows] = await connection.execute(sql, [
    Username,
    Contraseña,
    "Cliente",
    1,
  ]);
  return await rows;
};

export const postUsuarioGestion = async ({
  nombre,
  apellidos,
  celular,
  dni,
  fecha_nacimiento,
  username,
  contraseña,
  idRol,
  estado,
}) => {
  //PRIMERO: Registrar al usuario, devuelve un id usuario
  const sqlUsuario =
    "Insert into usuarios (ID_Rol, Username, Contraseña, Estado_usuario) Values (?,?,?,?)";
  const [usuario, fieldsU] = await connection.execute(sqlUsuario, [
    idRol,
    username,
    contraseña,
    estado,
  ]);

  //SEGUNDO: Registra un empleado
  const sqlEmpleado =
    "Insert into empleados (ID_usuario, Nombre_empleado, Apellidos_empleado, Numero_celular, Dni, Fecha_nacimiento) Values (?,?,?,?,?,?)";
  const [results, fieldsE] = await connection.execute(sqlEmpleado, [
    usuario.insertId,
    nombre,
    apellidos,
    celular,
    dni,
    fecha_nacimiento,
  ]);

  return results;
};

export const putUsuarioGestion = async ({
  nombre,
  apellidos,
  celular,
  dni,
  fecha_nacimiento,
  username,
  contraseña,
  idRol,
  estado,
  id,
}) => {
  const sql =
    "Select ID_empleado from empleados e inner join usuarios u on e.ID_usuario=u.ID_usuario Where e.ID_usuario=?";
  const [empleado] = await connection.execute(sql, [id]);
  const idempleado = empleado[0].ID_empleado;

  const sqlUsuario =
    "Update usuarios SET ID_Rol=?, Username=?, Contraseña=?, Estado_usuario=? Where ID_usuario=?";

  await connection.execute(sqlUsuario, [
    idRol,
    username,
    contraseña,
    estado,
    id,
  ]);

  const sqlEmpleado =
    "Update empleados SET ID_usuario=?, Nombre_empleado=?, Apellidos_empleado=?," +
    "Numero_celular=?, Dni=?, Fecha_nacimiento=? Where ID_empleado =?";

  const [result] = await connection.execute(sqlEmpleado, [
    id,
    nombre,
    apellidos,
    celular,
    dni,
    fecha_nacimiento,
    idempleado,
  ]);
  return result;
};

export const deleteUsuarioGestion = async (id) => {
  const [estado] = await connection.execute(
    "Select Estado_usuario from usuarios Where ID_usuario = ?",
    [id]
  );

  const estado_usuario = estado[0].Estado_usuario;
  const sql = "Update usuarios SET Estado_usuario=? Where ID_usuario = ?";
  if (estado_usuario === 1) {
    const [result] = await connection.execute(sql, [0, id]);
    return result;
  } else {
    const [result] = await connection.execute(sql, [1, id]);
    return result;
  }
};

/*CONSULTAR LOS ROLES*/
export const getRoles = async () => {
  const sql = "Select * from roles";
  const [result] = await connection.execute(sql);
  return await result;
};
