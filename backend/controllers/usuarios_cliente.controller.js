import {
  getClientes,
  getByIdCliente,
  buscarUsuarioCliente,
} from "../models/usuarios_cliente.model.js";

import { generarJWT, verificarJWT } from "../helpers/generarJWT.js";

const obtenerClientes = async (req, res) => {
  try {
    const clientes = await getClientes();

    if (Object.keys(clientes).length === 0) {
      const error = new Error("No hay Clientes");
      return res.status(404).json({ msg: error.message });
    }

    res.json(clientes);
  } catch (error) {
    return res.status(500).json({ msg: "Algo salio mal" });
  }
};

const obtenerCliente = async (req, res) => {
  try {
    const { id } = verificarJWT(req.params.id);

    const [cliente] = await getByIdCliente({ id });

    if (!cliente) {
      const error = new Error("El Cliente No Existe");
      return res.status(404).json({ msg: error.message });
    }

    res.status(200).json(cliente);
  } catch (error) {
    return res.status(500).json({ msg: "Algo salio mal" });
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

    const jwtToken = generarJWT(usuarioCliente.ID_usuario);

    //Si el UsuarioCliente existe
    res.json({
      msg: "Inicio de Sesion",
      token: jwtToken,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Algo salio mal" });
  }
};

export { obtenerClientes, obtenerCliente, inicioSesionCliente };
