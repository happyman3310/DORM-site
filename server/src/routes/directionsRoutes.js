import { Router } from "express";
import { recommendDirections } from "../controllers/directionsController.js";

const router = Router();

router.get("/recommend", recommendDirections);

export default router;
