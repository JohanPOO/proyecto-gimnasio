import { Router } from "express"
import { inicioSesionGestion } from "../controllers/usuarios_gestion.controller.js"
const router = Router()

router.post("/inicio-sesion-gestion", inicioSesionGestion)

export { router }