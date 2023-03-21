import { connection } from "../database/db.js";

export const getClases = async () => {
  const sql =
    "Select c.*, i.Nombre_instructor, h.* from clases c inner join instructores i on i.ID_instructor = c.ID_instructor " +
    "inner join horarios h on c.ID_horario = h.ID_horario";
  const [data] = await connection.execute(sql);
  return await data;
};

export const getByIdClase = async (id) => {
  const sql = "Select * from clases Where ID_clase=?";
  const [data] = await connection.execute(sql, [id]);
  return await data;
};

export const postClase = async ({
  nombre,
  url,
  descripcion,
  idInstructor,
  fecha,
  duracion,
  hora,
  estado,
}) => {
  //PRIMERO: registrar el horario, devuelve el ID_horario
  const sqlhorario =
    "Insert into horarios (Fecha, Duracion, Hora_inicio) Values(?,?,?)";

  const [horario, fields] = await connection.execute(sqlhorario, [
    fecha,
    duracion,
    hora,
  ]);

  //SEGUNDO: registrar la clase
  const sqlclase =
    "Insert into clases (ID_horario, ID_instructor, Nombre, Url_foto, Descripcion, Estado_clase) Values(?,?,?,?,?,?)";

  const [results, fieldsE] = await connection.execute(sqlclase, [
    horario.insertId,
    idInstructor,
    nombre,
    url,
    descripcion,
    estado,
  ]);

  return results;
};

export const deleteClase = async (id) => {
  const [estado] = await connection.execute(
    "Select Estado_clase from clases Where ID_clase = ?",
    [id]
  );

  const estado_clase = estado[0].Estado_clase;
  const sql = "Update clases SET Estado_clase=? Where ID_clase = ?";

  if (estado_clase === 1) {
    const [result] = await connection.execute(sql, [0, id]);
    return result;
  } else {
    const [result] = await connection.execute(sql, [1, id]);
    return result;
  }
};
