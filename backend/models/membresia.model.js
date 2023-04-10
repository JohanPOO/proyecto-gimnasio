import { connection } from "../database/db.js";

export const postRegistroUsuarioMembresia = async ({ usuario, contraseña }) => {
  const sql =
    "Insert into usuarios (ID_Rol, Username, Contraseña, Estado_usuario) Values (?,?,?,?)";
  const [user, fields] = await connection.execute(sql, [
    1,
    usuario,
    contraseña,
    1,
  ]);

  return await user.insertId;
};

export const postRegistroClienteMembresia = async ({
  idGenero,
  idUsuario,
  nombre,
  apellidos,
  celular,
  dni,
  correo,
  fechaNacimiento,
}) => {
  const sql =
    "Insert into clientes (ID_genero, ID_usuario, Nombre_cliente, Apellidos_cliente, Numero_celular, Dni, Correo_electronico, Fecha_nacimiento) values (?,?,?,?,?,?,?,?)";
  const [cliente, fields] = await connection.execute(sql, [
    idGenero,
    idUsuario,
    nombre,
    apellidos,
    celular,
    dni,
    correo,
    fechaNacimiento,
  ]);

  return await cliente.insertId;
};

export const postRegistroMembresia = async ({
  idCliente,
  tipoMemb,
  idSede,
  fechaInicio,
  fechaTerminada,
  renovacion,
}) => {
  const sql =
    "Insert into membresias (ID_cliente, ID_tip_memb, ID_sede, Fecha_inicio, Fecha_fin, Estado_membresia, Renovacion_automatica) values (?,?,?,?,?,?,?)";

  const [membresia, fields] = await connection.execute(sql, [
    idCliente,
    tipoMemb,
    idSede,
    fechaInicio,
    fechaTerminada,
    1,
    renovacion,
  ]);

  return await membresia.insertId;
};

export const getMembresias = async () => {
  const sql =
    "Select m.ID_memb,m.Estado_membresia, c.Nombre_cliente, t.Nombre, t.Descripcion, m.Fecha_inicio, m.Fecha_fin " +
    "from membresias m inner join tipo_membresias t on m.ID_tip_memb = t.ID_tip_memb inner join " +
    "clientes c on m.ID_cliente = c.ID_cliente";
  const [data] = await connection.execute(sql);
  return await data;
};

export const actualizarEstadoMembresia = async (id) => {
  const sql = "Update membresias SET Estado_membresia=? Where ID_memb=?";
  const [result] = await connection.execute(sql, [1, id]);
  return result;
};

export const postFacturacion = async ({
  idMembresia,
  hora,
  fechaPago,
  igv,
}) => {
  const [data] = await connection.execute(
    "Select t.Precio from membresias m inner join tipo_membresias t on m.ID_tip_memb = t.ID_tip_memb Where ID_memb = ?",
    [idMembresia]
  );

  let monto_total = data[0].Precio;
  const sql =
    "Insert into facturaciones (ID_metodo, ID_memb, Hora_pago, Fecha_pago, Igv, Monto_total, Estado_factura) values (?,?,?,?,?,?,?)";

  await connection.execute(sql, [
    1,
    idMembresia,
    hora,
    fechaPago,
    igv,
    monto_total,
    1,
  ]);
};
