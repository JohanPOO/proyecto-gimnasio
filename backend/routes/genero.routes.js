import { Router } from "express";
const router = Router();

import { obtenerGeneros } from "../controllers/generos.controller.js";

router.get("/generos", obtenerGeneros);
export { router };
