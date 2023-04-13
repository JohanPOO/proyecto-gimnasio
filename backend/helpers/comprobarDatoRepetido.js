import { connection } from "../database/db.js";

//Comprobar los datos al registrar
async function comprobarDatoRepetido(dato) {
  try {
    const sql1 =
      "Select Username, Numero_celular, Dni from empleados e inner join usuarios u on e.ID_usuario = u.ID_usuario Where e.Numero_celular = ? OR e.Dni = ? OR u.Username = ?";

    const sql2 =
      "Select Username, Numero_celular, Dni from clientes c inner join usuarios u on c.ID_usuario = u.ID_usuario Where c.Numero_celular = ? OR c.Dni = ? OR u.Username = ?";
    const [rows] = await connection.execute(sql1, [
      dato.celular,
      dato.dni,
      dato.username,
    ]);
    const [rows2] = await connection.execute(sql2, [
      dato.celular,
      dato.dni,
      dato.username,
    ]);

    const concat = rows.concat(rows2);

    let result = { duplicado: false };

    if (concat.length > 0) {
      for (let i = 0; i < concat.length; i++) {
        if (concat[i].Username === dato.username) {
          result = { duplicado: true, msg: "El nombre del usuario ya existe" };

          return result;
        }

        if (concat[i].Numero_celular === dato.celular) {
          result = { duplicado: true, msg: "El celular ya existe" };
          return result;
        }

        if (concat[i].Dni === dato.dni) {
          result = { duplicado: true, msg: "El dni ya existe" };
          return result;
        }
      }

      return result;
    } else {
      return {
        duplicado: false,
      };
    }
  } catch (error) {
    return {
      duplicado: false,
    };
  }
}

//Comprobar los datos al actualizar
async function comprobarDatoRepetidoUpdate(dato) {
  try {
    /* const sql =
      "SELECT u.Username, e.Numero_celular, e.Dni FROM empleados e " +
      "inner join usuarios u on e.ID_usuario = u.ID_usuario WHERE u.ID_usuario <> ?";*/
    /*const sql =
      "SELECT usuarios.Username, clientes.Numero_celular, clientes.Dni, empleados.Numero_celular, empleados.Dni FROM usuarios LEFT JOIN clientes ON usuarios.ID_usuario = clientes.ID_usuario LEFT JOIN empleados ON usuarios.ID_usuario = empleados.ID_usuario WHERE usuarios.ID_usuario <> ?";
    */

    const sql1 =
      "SELECT Username, Numero_celular, Dni FROM empleados e inner join usuarios u on e.ID_usuario = u.ID_usuario Where u.ID_usuario <> ?";

    const sql2 =
      "SELECT Username, Numero_celular, Dni FROM clientes c inner join usuarios u on c.ID_usuario = u.ID_usuario Where u.ID_usuario <> ?";
    const [rows] = await connection.execute(sql1, [dato.id]);
    const [rows2] = await connection.execute(sql2, [dato.id]);

    let result = { duplicado: false };
    const concat = rows.concat(rows2);
    if (concat.length > 0) {
      for (let i = 0; i < concat.length; i++) {
        if (concat[i].Username === dato.username) {
          result = { duplicado: true, msg: "El nombre del usuario ya existe" };

          return result;
        }

        if (concat[i].Numero_celular === dato.celular) {
          result = { duplicado: true, msg: "El celular ya existe" };
          return result;
        }

        if (concat[i].Dni === dato.dni) {
          result = { duplicado: true, msg: "El dni ya existe" };
          return result;
        }
      }
      //console.log("aaa");
      return result;
    } else {
      return result;
    }
  } catch (error) {
    return {
      duplicado: false,
    };
  }
}

export { comprobarDatoRepetido, comprobarDatoRepetidoUpdate };
