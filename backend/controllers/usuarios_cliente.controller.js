import {
  getUsuariosCliente,
  buscarUsuarioCliente,
} from "../models/usuarios_cliente.model.js";

import generarJWT from "../helpers/generarJWT.js";

const usuarios_cliente = async (req, res) => {
  try {
    const [rows] = await getUsuariosCliente();
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      msg: "Algo salio mal",
    });
  }
};

const inicioSesionCliente = async (req, res) => {
  try {
    const { username, password } = req.body;

    if ([username, password].includes("")) {
      const error = new Error("No se permiten campos vacios");
      return res.status(400).json({ msg: error.message });
    }

    //Verificar si el UsuarioCliente exite
    const [usuarioCliente] = await buscarUsuarioCliente(username, password);

    //Si el UsuarioCliente no existe
    if (!usuarioCliente) {
      const error = new Error("El Usuario Cliente No Existe");
      return res.status(404).json({ msg: error.message });
    }

    console.log(usuarioCliente);
    //Si el UsuarioCliente existe
    res.json({
      id: usuarioCliente.ID_usuario,
      msg: "Inicio de Sesion",
      token: generarJWT(usuarioCliente.ID_usuario),
    });
  } catch (error) {
    return res.status(500).json({ msg: "Algo salio mal" });
  }
};

export { usuarios_cliente, inicioSesionCliente };
