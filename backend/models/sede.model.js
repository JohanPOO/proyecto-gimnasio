import { connection } from "../database/db.js";

const getSedes = async () => {
    const sql = "Select * from sedes";
    const [results] = await connection.execute(sql);
    return results
}


const getByIdSede = async (id) => {
    const sql = "Select * from sedes Where ID_sede = ?";
    const [result] = await connection.execute(sql, [id])
    return result
}

const postRegistroSede = async (nombre_provincia, nombre_distrito, url, nombre, direccion, estado )=>{
    const sqlProvincia = "INSERT INTO provincias (Nombre_provincia) VALUES (?)";
    const [provincia, fieldsP] = await connection.execute(sqlProvincia, [nombre_provincia])

    const sqlDistrito = "INSERT INTO distritos (Nombre_provincia, Id_provincia) Values (?,?)";
    const [distrito, fieldsD] = await connection.execute(sqlDistrito, [nombre_distrito, provincia.insertId])

    const sqlImagen = "INSERT INTO promociones (Url_imagen) VALUES (?)";
    const [imagen, fieldsI] = await connection.execute(sqlImagen, [url])

    const sqlSede = "INSERT INTO sedes (Nombre, Direccion, Id_distrito, Id_imagen, Estado_sede) VALUES (?,?,?,?,?)";
    const [sede, fieldsS] = await connection.execute(sqlSede,[nombre, direccion, distrito.insertId, imagen.insertId, estado]);
   
    return sede
}

const putSede = async (nombre, direccion, nombre_distrito, nombre_provincia, url, estado, id) => {
    
    //Buscar el id de la provincia mediante la tabla sede, con el id de la sede
    const sqlprovincia = "SELECT p.Id_provincia from sedes s INNER JOIN distritos d on s.ID_distrito = d.ID_distrito inner join provincias p on d.Id_provincia = p.Id_provincia Where ID_sede = ?"
    const [provincia] = await connection.execute(sqlprovincia, [id]);
    const idprovincia = provincia[0].Id_provincia;

    //Actualizamos el dato de la tabla provincia.
    await connection.execute("UPDATE provincias SET Nombre_provincia=? WHERE Id_provincia=?", [nombre_provincia, idprovincia]);

    //Buscar el id del distrito mediante la tabla sede, con el id de la sede
    const sqldistrito = "Select d.Id_distrito from sedes s inner join distritos d on s.ID_distrito = d.ID_distrito Where ID_sede=?";
    const [distrito] = await connection.execute(sqldistrito, [id])
    const iddistrito = distrito[0].Id_distrito;

    //Actualizamos el dato de la tabla distrito.
    await connection.execute("UPDATE distritos SET Nombre_provincia=? Where Id_distrito=?", [nombre_distrito, iddistrito]);
    
    //Buscamoos el id de la tabla promociones mediante la tabla sede, con el id sede
    const sqlpromociones = "Select p.Id_Imagen from sedes s inner join promociones p on s.ID_imagen = p.ID_imagen WHERE ID_sede=?";
    const [imagen] = await connection.execute(sqlpromociones, [id]);
    const idimagen = imagen[0].Id_Imagen;

    //Actualizamos la url de la tabla promociones.
    await connection.execute("UPDATE promociones SET Url_imagen=? Where Id_Imagen=?", [url, idimagen]);

    //Actualizamos la tabla sede con los datos que se solicitan
    const sqlsede = "UPDATE sedes SET Nombre=?, Direccion=?, Id_distrito=?, ID_imagen=?, Estado_sede=? WHERE ID_sede=?";
    const [result] = await connection.execute(sqlsede, [nombre, direccion, iddistrito, idimagen, estado, id])

    return result;
}       

const deleteSede = async (id) => {
    const sql = "Update sedes SET Estado_sede=? Where ID_sede = ?";
    const [result] = await connection.execute(sql, [0, id]);
    return result
}


export {getSedes, getByIdSede, postRegistroSede, putSede, deleteSede}