import { Router } from "express";
import {
  obtenerInstructores,
  buscarInstructor,
  registroInstructor,
  editarInstructor,
  eliminarInstructor,
} from "../controllers/instructor.controller.js";

const router = Router();

router.get("/instructores", obtenerInstructores);
router.get("/instructor/:id", buscarInstructor);
router.post("/registro-instructor", registroInstructor);
router.put("/editar-instructor/:id", editarInstructor);
router.delete("/eliminar-instructor/:id", eliminarInstructor);
export { router };
