import express from "express";
import {
  deleteTask,
  getMyTask,
  newTask,
  updateTask,
} from "../controllers/task.js";

const router = express.Router();

router.get("/new", newTask);

router.post("/mytask", getMyTask);

router.route("/:id").put(updateTask).delete(deleteTask);

export default router;
