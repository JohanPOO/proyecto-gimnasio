import { connection } from "../database/db.js";

export const getTipoMembresias = async () => {
  const sql = "Select * from tipo_membresias";
  const [result] = await connection.execute(sql);
  return result;
};

export const getByTipoMembresia = async (id) => {
  const sql = "Select * from tipo_membresias Where ID_tip_memb = ?";
  const [result] = await connection.execute(sql, [id]);
  return result;
};

export const postRegistroTipoMembresia = async ({
  nombre,
  descripcion,
  precio,
  estado,
}) => {
  const sql =
    "Insert into tipo_membresias (Nombre, Descripcion, Precio, Estado_tip_memb) Values (?,?,?,?)";

  const [tipomembresia, fields] = await connection.execute(sql, [
    nombre,
    descripcion,
    precio,
    estado,
  ]);

  return tipomembresia;
};

export const putTipoMembresia = async ({
  nombre,
  descripcion,
  precio,
  estado,
  id,
}) => {
  const sql =
    "Update tipo_membresias SET Nombre=?, Descripcion=?, Precio=?, Estado_tip_memb=? Where ID_tip_memb=?";

  const [result] = await connection.execute(sql, [
    nombre,
    descripcion,
    precio,
    estado,
    id,
  ]);

  return result;
};

export const deleteTipoMembresia = async (id) => {
  const [estado] = await connection.execute(
    "Select Estado_tip_memb from tipo_membresias Where ID_tip_memb = ?",
    [id]
  );

  const estado_tip_memb = estado[0].Estado_tip_memb;
  const sql =
    "Update tipo_membresias SET Estado_tip_memb=? Where ID_tip_memb = ?";

  if (estado_tip_memb === 1) {
    const [result] = await connection.execute(sql, [0, id]);
    return result;
  } else {
    const [result] = await connection.execute(sql, [1, id]);
    return result;
  }
};
