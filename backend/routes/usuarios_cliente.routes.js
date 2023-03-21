import { Router } from "express";
import { inicioSesionCliente } from "../controllers/usuarios_cliente.controller.js";
const router = Router();

router.post("/inicio-sesion-cliente", inicioSesionCliente);

export { router };
