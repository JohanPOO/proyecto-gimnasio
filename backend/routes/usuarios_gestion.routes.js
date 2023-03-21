import { Router } from "express";
import {
  obtenerUsuariosGestion,
  registroUsuarioGestion,
  inicioSesionGestion,
  editarUsuarioGestion,
  eliminarUsuarioGestion,
  obtenerRoles,
} from "../controllers/usuarios_gestion.controller.js";
const router = Router();

router.get("/usuarios-gestion", obtenerUsuariosGestion);
router.post("/registro-usuario-gestion", registroUsuarioGestion);
router.post("/inicio-sesion-gestion", inicioSesionGestion);
router.put("/editar-usuario-gestion/:id", editarUsuarioGestion);
router.delete("/eliminar-usuario-gestion/:id", eliminarUsuarioGestion);

//Roles
router.get("/roles", obtenerRoles);

export { router };
