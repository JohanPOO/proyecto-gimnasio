import { connection } from "../database/db.js";

/*Conexion y Busqueda en la base de datos*/

const getInstructor = async () => {
  /*const sql =
    "Select i.*, s.Nombre as NombreSede, im.Url_imagen from instructores i inner join sedes s "+ 
    "on i.ID_sede = s.ID_sede inner join imagenes im on i.ID_imagen = im.ID_Imagen Order by ID_instructor ASC";*/

  const sql =
    "Select i.*, s.Nombre as NombreSede from instructores i inner join sedes s " +
    "on i.ID_sede = s.ID_sede Order by ID_instructor ASC";
  const [data] = await connection.execute(sql);
  return await data;
};

const getByIdInstructor = async (id) => {
  const sql = "Select * from instructores Where ID_instructor=?";
  const [data] = await connection.execute(sql, [id]);
  return await data;
};

const postInstructor = async ({
  url,
  idSede,
  nombre,
  apellidos,
  especialidad,
  trayectoria,
  fechaRegistro,
  estado,
}) => {
  const sql =
    "Insert into instructores (ID_sede, Nombre_instructor, Apellidos_instructor, Especialidad, Trayectoria, Url_foto, Estado_instructor, Fecha_registro) Values (?,?,?,?,?,?,?,?)";

  const [results, fields] = await connection.execute(sql, [
    idSede,
    nombre,
    apellidos,
    especialidad,
    trayectoria,
    url,
    estado,
    fechaRegistro,
  ]);

  return results;
};

const putInstructor = async ({
  id,
  url,
  idSede,
  nombre,
  apellidos,
  especialidad,
  trayectoria,
  fechaRegistro,
  estado,
}) => {
  //Actualizamos la tabla instructores
  const sql =
    "Update instructores SET ID_sede=?, Nombre_instructor=?," +
    "Apellidos_instructor=?,Especialidad=?, Trayectoria=?, Url_foto=?, Estado_instructor=?," +
    "Fecha_registro=? Where ID_instructor=?";
  const [result] = await connection.execute(sql, [
    idSede,
    nombre,
    apellidos,
    especialidad,
    trayectoria,
    url,
    estado,
    fechaRegistro,
    id,
  ]);

  return result;
};

const deleteInstructor = async (id) => {
  const [estado] = await connection.execute(
    "Select Estado_instructor from instructores Where ID_instructor = ?",
    [id]
  );

  const estado_instructor = estado[0].Estado_instructor;
  const sql =
    "Update instructores SET Estado_instructor=? Where ID_instructor = ?";
  if (estado_instructor === 1) {
    const [result] = await connection.execute(sql, [0, id]);
    return result;
  } else {
    const [result] = await connection.execute(sql, [1, id]);
    return result;
  }
};

export {
  getInstructor,
  getByIdInstructor,
  postInstructor,
  putInstructor,
  deleteInstructor,
};
