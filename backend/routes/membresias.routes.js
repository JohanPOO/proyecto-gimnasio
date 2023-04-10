import { Router } from "express";
const router = Router();

import {
  createOrder,
  captureOrder,
  cancelOrder,
  obtenerMembresias,
  renovarMembresia,
  capturarMembresia,
} from "../controllers/membresia.controller.js";

router.post("/create-order", createOrder);

router.get("/capture-order", captureOrder);

router.get("/cancel-order", cancelOrder);

router.get("/membresias", obtenerMembresias);

router.post("/renovar-membresia", renovarMembresia);

router.get("/capturar-renovacion", capturarMembresia);

export { router };
