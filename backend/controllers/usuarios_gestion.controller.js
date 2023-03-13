import { buscarUsuarioGestion } from "../models/usuarios_gestion.model.js";
import generarJWT from "../helpers/generarJWT.js";

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

export { inicioSesionGestion };
