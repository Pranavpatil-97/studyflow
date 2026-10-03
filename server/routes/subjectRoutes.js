import { Router } from "express";
import {
  listSubjects, createSubject, updateSubject, deleteSubject, listUnits, createUnit,
} from "../controllers/subjectController.js";
import { protect } from "../middleware/auth.js";

const router = Router();
router.use(protect);

router.route("/").get(listSubjects).post(createSubject);
router.route("/:id").patch(updateSubject).delete(deleteSubject);
router.route("/:id/units").get(listUnits).post(createUnit);

export default router;