import { connection } from "../database/db.js";

const getSedes = async () => {
  /*const sql =
    "SELECT s.ID_sede, s.Nombre, s.Direccion, d.Nombre_distrito, p.Nombre_provincia," +
    "i.Url_imagen, s.Estado_sede FROM sedes s inner join imagenes i ON i.ID_Imagen = s.Id_imagen " +
    "inner join distritos d ON s.ID_distrito = d.ID_distrito inner join provincias p ON d.ID_provincia = p.ID_provincia;";*/

  const sql =
    "SELECT s.ID_sede, s.Nombre, s.Direccion, s.Url_foto, d.Nombre_distrito,p.Nombre_provincia, dp.Nombre_departamento," +
    " s.Estado_sede FROM sedes s inner join distritos d ON s.ID_distrito = d.ID_distrito " +
    "inner join provincias p ON d.ID_provincia = p.ID_provincia inner join departamentos dp on p.ID_departamento = dp.ID_departamento";
  const [results] = await connection.execute(sql);
  return results;
};

const getByIdSede = async (id) => {
  const sql = "Select * from sedes Where ID_sede = ?";
  const [result] = await connection.execute(sql, [id]);
  return result;
};

const postRegistroSede = async (
  nombre,
  direccion,
  nombre_distrito,
  nombre_provincia,
  nombre_departamento,
  url,
  estado
) => {
  //PRIMERO: Codigo para registrar un departamento. Resultado el id del departamento
  const sqlDepartamento =
    "INSERT INTO departamentos (Nombre_departamento) VALUES (?)";
  const [departamento, fieldsDP] = await connection.execute(sqlDepartamento, [
    nombre_departamento,
  ]);

  //SEGUNDO: Codigo para registrar segundo una provincia. Resultado el id de la provincia
  const sqlProvincia =
    "INSERT INTO provincias (ID_departamento, Nombre_provincia) VALUES (?,?)";
  const [provincia, fieldsP] = await connection.execute(sqlProvincia, [
    departamento.insertId,
    nombre_provincia,
  ]);

  //TERCERO: Codigo para registrar un distrito. Resultado el id de la distrito
  const sqlDistrito =
    "INSERT INTO distritos (ID_provincia, Nombre_distrito) Values (?,?)";
  const [distrito, fieldsD] = await connection.execute(sqlDistrito, [
    provincia.insertId,
    nombre_distrito,
  ]);

  //CUARTO: Codigo para registrar una sede.
  const sqlSede =
    "INSERT INTO sedes (ID_distrito, Nombre, Direccion, Url_foto, Estado_sede) VALUES (?,?,?,?,?)";
  const [sede, fieldsS] = await connection.execute(sqlSede, [
    distrito.insertId,
    nombre,
    direccion,
    url,
    estado,
  ]);

  return sede;
};

const putSede = async (
  nombre,
  direccion,
  nombre_distrito,
  nombre_provincia,
  nombre_departamento,
  url,
  estado,
  id
) => {
  //PRIMERO: Buscar el id del departamento mediante la tabla sede, con el id de la sede
  const sqldepartamento =
    "SELECT dp.ID_departamento from sedes s INNER JOIN distritos d on " +
    "s.ID_distrito = d.ID_distrito inner join provincias p on d.ID_provincia = p.ID_provincia " +
    "inner join departamentos dp on  p.ID_departamento = dp.ID_departamento Where ID_sede = ?";

  const [departamento] = await connection.execute(sqldepartamento, [id]);
  const iddepartamento = departamento[0].ID_departamento;

  //Actualizamos el dato de la tabla departamentos.
  await connection.execute(
    "UPDATE departamentos SET Nombre_departamento=? WHERE ID_departamento=?",
    [nombre_departamento, iddepartamento]
  );

  //SEGUNDO: Buscar el id de la provincia mediante la tabla sede, con el id de la sede
  const sqlprovincia =
    "SELECT p.ID_provincia from sedes s INNER JOIN distritos d on s.ID_distrito = d.ID_distrito inner join provincias p on d.ID_provincia = p.ID_provincia Where ID_sede = ?";
  const [provincia] = await connection.execute(sqlprovincia, [id]);
  const idprovincia = provincia[0].ID_provincia;

  //Actualizamos el dato de la tabla provincia.
  await connection.execute(
    "UPDATE provincias SET Nombre_provincia=? WHERE ID_provincia=?",
    [nombre_provincia, idprovincia]
  );

  //TERCERO: Buscar el id del distrito mediante la tabla sede, con el id de la sede
  const sqldistrito =
    "Select d.ID_distrito from sedes s inner join distritos d on s.ID_distrito = d.ID_distrito Where ID_sede=?";
  const [distrito] = await connection.execute(sqldistrito, [id]);
  const iddistrito = distrito[0].ID_distrito;

  //Actualizamos el dato de la tabla distrito.
  await connection.execute(
    "UPDATE distritos SET Nombre_distrito=? Where ID_distrito=?",
    [nombre_distrito, iddistrito]
  );

  //CUARTO: Actualizamos la tabla sede con los datos que se solicitan
  const sqlsede =
    "UPDATE sedes SET ID_distrito=?, Nombre=?, Direccion=?, Url_foto=?, Estado_sede=? WHERE ID_sede=?";
  const [result] = await connection.execute(sqlsede, [
    iddistrito,
    nombre,
    direccion,
    url,
    estado,
    id,
  ]);

  return result;
};

const deleteSede = async (id) => {
  const [estado] = await connection.execute(
    "Select Estado_sede from sedes Where ID_sede = ?",
    [id]
  );

  const estado_sede = estado[0].Estado_sede;
  const sql = "Update sedes SET Estado_sede=? Where ID_sede = ?";
  if (estado_sede === 1) {
    const [result] = await connection.execute(sql, [0, id]);
    return result;
  } else {
    const [result] = await connection.execute(sql, [1, id]);
    return result;
  }
};

export { getSedes, getByIdSede, postRegistroSede, putSede, deleteSede };
