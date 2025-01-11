import {
  getClientes,
  getByIdCliente,
  buscarUsuarioCliente,
  getByEmail,
  UpdateContraseña,
} from "../models/usuarios_cliente.model.js";

import { comprobarDatoRepetido } from "../helpers/comprobarDatoRepetido.js";

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

const comprobarCorreo = async (req, res) => {
  try {
    const { correo } = req.params;
    if ([correo].includes("")) {
      const error = new Error("No se permite el campo vacio");
      return res.status(404).json({ msg: error.message });
    }

    const [cliente] = await getByEmail({ correo });

    if (!cliente) {
      const error = new Error("El Correo No Existe");
      return res.status(404).json({ msg: error.message });
    }

    res.status(200).json(cliente);
  } catch (error) {
    return res.status(500).json({ msg: error.msg });
  }
};

const cambiarContraseña = async (req, res) => {
  try {
    const { id } = req.params;
    const { password, confirmPassword } = req.body;

    if ([password, confirmPassword].includes("")) {
      const error = new Error("No se permiten campos vacios");
      return res.status(400).json({ msg: error.message });
    }

    if (password !== confirmPassword) {
      const error = new Error("Las contraseñas no concuerdan");
      return res.status(400).json({ msg: error.message });
    }

    const result = await UpdateContraseña({ id, password });
    if (result.affectedRows === 0) {
      const error = new Error("Contraseña No Actualizado");
      return res.status(304).json({ msg: error.message });
    }

    return res.json({ msg: "Contraseña Actualizado" });
  } catch (error) {
    return res.status(500).json({ msg: error.msg });
  }
};

const comprobarClientes = async (req, res) => {
  try {
    const { usuario: username, dni, celular } = req.body;

    const repetido = await comprobarDatoRepetido({ username, dni, celular });

    return res.status(200).json(repetido);
  } catch (error) {
    return res.status(500).json({ msg: error.msg });
  }
};

export {
  obtenerClientes,
  obtenerCliente,
  inicioSesionCliente,
  comprobarCorreo,
  cambiarContraseña,
  comprobarClientes,
};
