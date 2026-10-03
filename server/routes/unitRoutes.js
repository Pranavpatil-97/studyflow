import { Router } from "express";
import { updateUnit, deleteUnit } from "../controllers/subjectController.js";
import { protect } from "../middleware/auth.js";

const router = Router();
router.use(protect);

router.route("/:id").patch(updateUnit).delete(deleteUnit);

export default router;