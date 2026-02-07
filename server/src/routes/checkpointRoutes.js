import { Router } from "express";
import {
  createCheckpoint,
  getHistory,
} from "../controllers/checkpointController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", requireAuth, createCheckpoint);
router.get("/history", requireAuth, getHistory);

export default router;
