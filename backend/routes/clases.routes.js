import { Router } from "express";
import {
  obtenerClases,
  registroClase,
  eliminarClase,
} from "../controllers/clases.controller.js";

const router = Router();

router.get("/clases", obtenerClases);
router.post("/registro-clase", registroClase);
router.delete("/eliminar-clase/:id", eliminarClase);

export { router };
