import { Router } from "express";
import { updateProfile } from "../controllers/userController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.put("/", requireAuth, updateProfile);

export default router;
