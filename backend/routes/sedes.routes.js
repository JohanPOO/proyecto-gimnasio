import { Router } from "express";
import {
  registroSede,
  buscarSede,
  obtenerSedes,
  editarSede,
  eliminarSede,
} from "../controllers/sede.controller.js";

const router = Router();

router.get("/sedes", obtenerSedes);
router.get("/sede/:id", buscarSede);
router.post("/registro-sede", registroSede);
router.put("/editar-sede/:id", editarSede);
router.delete("/eliminar-sede/:id", eliminarSede);
export { router };
