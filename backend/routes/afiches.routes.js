import { Router } from "express";
import { obtenerAfiches } from "../controllers/afiches.controller.js";

const router = Router();

router.get("/afiches", obtenerAfiches);
export { router };
