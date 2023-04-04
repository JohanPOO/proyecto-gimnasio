import { Router } from "express";
import {
  obtenerClientes,
  obtenerCliente,
  inicioSesionCliente,
} from "../controllers/usuarios_cliente.controller.js";
const router = Router();

router.get("/clientes", obtenerClientes);
router.get("/cliente/:id", obtenerCliente);
router.post("/inicio-sesion-cliente", inicioSesionCliente);

export { router };
