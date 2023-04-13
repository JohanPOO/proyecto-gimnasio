import { Router } from "express";
import {
  obtenerClientes,
  obtenerCliente,
  inicioSesionCliente,
  comprobarCorreo,
  cambiarContraseña,
  comprobarClientes,
} from "../controllers/usuarios_cliente.controller.js";
const router = Router();

router.get("/clientes", obtenerClientes);
router.get("/cliente/:id", obtenerCliente);
router.post("/comprobar-clientes", comprobarClientes);
router.post("/inicio-sesion-cliente", inicioSesionCliente);
router.get("/comprobar-correo/:correo", comprobarCorreo);
router.put("/cambiar-contrasenia/:id", cambiarContraseña);

export { router };
