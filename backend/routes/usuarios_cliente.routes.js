import { Router } from "express";
import {
  usuarios_cliente,
  inicioSesionCliente,
} from "../controllers/usuarios_cliente.controller.js";
const router = Router();

router.get("/", usuarios_cliente);
router.post("/inicio-sesion-cliente", inicioSesionCliente);

export { router };
