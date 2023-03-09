import {Router} from "express"
import { registroSede, buscarSede, obtenerSedes, editarSede, eliminarSede } from "../controllers/sede.controller.js"

const router = Router()

router.get("/sedes", obtenerSedes)
router.get("/sedes/:id", buscarSede)
router.post("/registro-sede", registroSede)
router.put("/editar-sede/:id", editarSede)
router.delete("/sedes/:id", eliminarSede)
export {router}