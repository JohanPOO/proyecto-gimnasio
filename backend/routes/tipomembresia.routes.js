import { Router } from "express";

import {
  obtenerTiposMembresias,
  buscarTipoMembresia,
  registroTipoMembresia,
  editarTipoMembresia,
  eliminarTipoMembresia,
} from "../controllers/tipomembresia.controller.js";

const router = Router();

router.get("/tipomembresias", obtenerTiposMembresias);
router.get("/tipomembresia/:id", buscarTipoMembresia);
router.post("/registro-tipomembresia", registroTipoMembresia);
router.put("/editar-tipomembresia/:id", editarTipoMembresia);
router.delete("/eliminar-tipomembresia/:id", eliminarTipoMembresia);

export { router };
