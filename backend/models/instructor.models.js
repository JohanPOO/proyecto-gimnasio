import { connection } from "../database/db.js";

/*Conexion y Busqueda en la base de datos*/

const getInstructor = async () => {
  //const sql = "Select * from instructores";
  const sql =
    "Select i.*, s.Nombre as NombreSede, im.Url_imagen from instructores i inner join sedes s on i.ID_sede = s.ID_sede inner join imagenes im on i.ID_imagen = im.ID_Imagen Order by ID_instructor ASC";
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
  const [data] = await connection.execute(
    "Insert into imagenes (Url_imagen) Values (?)",
    [url]
  );
  const idimagen = data.insertId;

  const sql =
    "Insert into instructores (ID_imagen, ID_sede, Nombre_instructor, Apellidos_instructor, Especialidad, Trayectoria, Estado_instructor, Fecha_registro) Values (?,?,?,?,?,?,?,?)";

  const [results, fields] = await connection.execute(sql, [
    idimagen,
    idSede,
    nombre,
    apellidos,
    especialidad,
    trayectoria,
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
  //Buscamoos el id de la tabla imagenes mediante la tabla instructores, con el id instructores
  const sqlimagen =
    "Select im.ID_Imagen from instructores i inner join imagenes im on i.ID_imagen = im.ID_Imagen WHERE ID_instructor=?";
  const [imagen] = await connection.execute(sqlimagen, [id]);
  const idimagen = imagen[0].ID_Imagen;

  //Actualizamos la url de la tabla imagenes.
  await connection.execute(
    "UPDATE imagenes SET Url_imagen=? Where ID_Imagen=?",
    [url, idimagen]
  );

  //Actualizamos la tabla instructores
  const sql =
    "Update instructores SET ID_imagen=?, ID_sede=?,Nombre_instructor=?," +
    "Apellidos_instructor=?,Especialidad=?, Trayectoria=?, Estado_instructor=?," +
    "Fecha_registro=? Where ID_instructor=?";
  const [result] = await connection.execute(sql, [
    idimagen,
    idSede,
    nombre,
    apellidos,
    especialidad,
    trayectoria,
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
