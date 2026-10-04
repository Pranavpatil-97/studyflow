import { Router } from "express";
import { listSessions, createSession } from "../controllers/focusController.js";
import { protect } from "../middleware/auth.js";

const router = Router();
router.use(protect);

router.route("/").get(listSessions).post(createSession);

export default router;