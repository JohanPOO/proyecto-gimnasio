import { Router } from "express";
import {
  obtenerClases,
  registroClase,
  editarClase,
  eliminarClase,
} from "../controllers/clases.controller.js";

const router = Router();

router.get("/clases", obtenerClases);
router.post("/registro-clase", registroClase);
router.put("/editar-clase/:id", editarClase);
router.delete("/eliminar-clase/:id", eliminarClase);

export { router };
