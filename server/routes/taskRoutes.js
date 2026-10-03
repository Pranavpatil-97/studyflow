import { Router } from "express";
import { listTasks, createTask, updateTask, deleteTask } from "../controllers/taskController.js";
import { protect } from "../middleware/auth.js";

const router = Router();
router.use(protect);

router.route("/").get(listTasks).post(createTask);
router.route("/:id").patch(updateTask).delete(deleteTask);

export default router;