import {
  getUsuariosGestion,
  getByIdUsuarioGestion,
  postUsuarioGestion,
  buscarUsuarioGestion,
  putUsuarioGestion,
  deleteUsuarioGestion,
  getRoles,
} from "../models/usuarios_gestion.model.js";
import generarJWT from "../helpers/generarJWT.js";
import {
  comprobarDatoRepetido,
  comprobarDatoRepetidoUpdate,
} from "../helpers/comprobarDatoRepetido.js";

//Listado de los usuarios de gestion
const obtenerUsuariosGestion = async (req, res) => {
  try {
    const usuariosGestion = await getUsuariosGestion();
    res.json(usuariosGestion);
  } catch (error) {
    return res.status(500).json({ msg: "Algo salio mal en gestion" });
  }
};

//Registro de un usuario de gestion
const registroUsuarioGestion = async (req, res) => {
  try {
    const {
      nombre,
      apellidos,
      celular,
      dni,
      fecha_nacimiento,
      username,
      contraseña,
      idRol,
      estado,
    } = req.body;

    if (
      [
        nombre,
        apellidos,
        celular,
        dni,
        fecha_nacimiento,
        username,
        contraseña,
        idRol,
        estado,
      ].includes("")
    ) {
      const error = new Error("No se permiten datos vacios");
      return res.status(400).json({ msg: error.message });
    }

    if (dni.length < 8 || dni.length > 8) {
      const error = new Error("Error en la longitud del DNI");
      return res.status(406).json({ msg: error.message });
    }

    if (celular.length < 9 || celular.length > 9) {
      const error = new Error("Error en la longitud del celular");
      return res.status(406).json({ msg: error.message });
    }

    //Comprobar datos repetidos
    const repetido = await comprobarDatoRepetido({ username, celular, dni });

    if (repetido.duplicado) {
      return res.status(406).json({ msg: repetido.msg });
    }

    //Registrar el Usuario
    const result = await postUsuarioGestion({
      nombre,
      apellidos,
      celular,
      dni,
      fecha_nacimiento,
      username,
      contraseña,
      idRol,
      estado,
    });

    if (result.affectedRows < 1) {
      const error = new Error("No se puedo registrar al usuario");
      return res.status(401).json({ msg: error.message });
    }

    res.status(200).json({ msg: "Registro EXISTOSO" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

//Inicio de sesion Usuarios Gestion
const inicioSesionGestion = async (req, res) => {
  try {
    const { username, password } = req.body;

    if ([username, password].includes("")) {
      const error = new Error("No se permiten campos vacios");
      return res.status(400).json({ msg: error.message });
    }

    const [usuarioGestion] = await buscarUsuarioGestion(username, password);

    if (!usuarioGestion) {
      const error = new Error("El Usuario Gestion No Existe");
      return res.status(404).json({ msg: error.message });
    }

    res.json({
      id: usuarioGestion.ID_gestor,
      msg: "Inicio de Sesion de Gestion",
      token: generarJWT(usuarioGestion.ID_gestor),
    });
  } catch (error) {
    return res.status(500).json({ msg: "Algo salio mal en gestion" });
  }
};

//Editar de un usuario de gestion
const editarUsuarioGestion = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const {
      nombre,
      apellidos,
      celular,
      dni,
      fecha_nacimiento,
      username,
      contraseña,
      idRol,
      estado,
    } = req.body;

    if (
      idRol < 1 ||
      [
        nombre,
        apellidos,
        celular,
        dni,
        fecha_nacimiento,
        username,
        contraseña,
        idRol,
        estado,
      ].includes("")
    ) {
      const error = new Error("No se permiten datos vacios");
      return res.status(400).json({ msg: error.message });
    }

    if (dni.length < 8 || dni.length > 8) {
      const error = new Error("Error en la longitud del DNI");
      return res.status(406).json({ msg: error.message });
    }

    if (celular.length < 9 || celular.length > 9) {
      const error = new Error("Error en la longitud del celular");
      return res.status(406).json({ msg: error.message });
    }

    const repetido = await comprobarDatoRepetidoUpdate({
      celular,
      dni,
      username,
      id,
    });

    if (repetido.duplicado) {
      return res.status(406).json({ msg: repetido.msg });
    }

    const result = await putUsuarioGestion({
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
    });

    if (result.affectedRows < 1) {
      const error = new Error("No se puedo editar al usuario");
      return res.status(401).json({ msg: error.message });
    }

    res.status(200).json({ msg: "Usuario Actualizado" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

//Cambiar estado al usuario de gestion
const eliminarUsuarioGestion = async (req, res) => {
  try {
    const { id } = req.params;

    const usuarioGestion = await getByIdUsuarioGestion(id);

    if (Object.keys(usuarioGestion).length === 0) {
      const error = new Error("El Usuario No Existe");
      return res.status(404).json({ msg: error.message });
    }

    const usuarioGestionDelete = await deleteUsuarioGestion(id);

    if (usuarioGestionDelete.affectedRows === 1) {
      res.status(200).json({
        msg: "Cambió el Estado del Usuario Correctamente",
      });
    } else {
      return res.status(501).json({
        msg: "Ocurrio un error inesperado",
      });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

/*LLAMADO A LOS ROLES*/
const obtenerRoles = async (req, res) => {
  try {
    const roles = await getRoles();

    if (Object.keys(roles).length === 0) {
      const error = new Error("No hay roles disponibles");
      return res.json(404).json({ msg: error.message });
    }

    res.status(200).json(roles);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export {
  obtenerUsuariosGestion,
  registroUsuarioGestion,
  inicioSesionGestion,
  editarUsuarioGestion,
  eliminarUsuarioGestion,
  obtenerRoles,
};
