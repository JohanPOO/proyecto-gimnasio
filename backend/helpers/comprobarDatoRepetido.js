import { connection } from "../database/db.js";

//Comprobar los datos al registrar
async function comprobarDatoRepetido(dato) {
  try {
    const [rows] = await connection.query(
      `Select * from empleados e inner join usuarios u 
      on e.ID_usuario = u.ID_usuario
      Where e.Numero_celular = ? OR e.Dni = ? OR u.Username = ?`,
      [dato.celular, dato.dni, dato.username]
    );

    if (rows.length > 0) {
      let result;
      rows.forEach((row) => {
        if (row.Numero_celular === dato.celular) {
          result = { duplicado: true, msg: "El celular ya existe" };
          return;
        }

        if (row.Dni === dato.dni) {
          result = { duplicado: true, msg: "El dni ya existe" };
          return;
        }

        if (row.Username === dato.username) {
          result = { duplicado: true, msg: "Nombre del usuario ya existe" };
        }
      });

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
    const sql =
      "SELECT u.Username, e.Numero_celular, e.Dni FROM empleados e " +
      "inner join usuarios u on e.ID_usuario = u.ID_usuario WHERE u.ID_usuario <> ?";
    const [rows] = await connection.execute(sql, [dato.id]);

    if (rows.length > 0) {
      let result = { duplicado: false };

      rows.forEach((row) => {
        console.log(row);
        if (row.Numero_celular === dato.celular) {
          result = { duplicado: true, msg: "El celular ya existe" };
          return;
        }

        if (row.Dni === dato.dni) {
          result = { duplicado: true, msg: "El dni ya existe" };
          return;
        }

        if (row.Username === dato.username) {
          result = { duplicado: true, msg: "El nombre del usuario ya existe" };

          return;
        }
        console.log("ga");
      });

      return result;
    } else {
      console.log(result);
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

export { comprobarDatoRepetido, comprobarDatoRepetidoUpdate };
