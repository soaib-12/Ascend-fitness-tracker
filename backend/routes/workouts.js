import express from "express";
import checkToken from "../middlewares/checkToken.js";
import {
  createWorkout,
  deleteWorkout,
  listWorkouts,
  updateWorkout,
  toggleWorkout,
} from "../controller/workoutController.js";

const router = express.Router();

router.use(checkToken);
router.get("/", listWorkouts);
router.post("/", createWorkout);
router.put("/:id", updateWorkout);
router.patch("/:id/toggle", toggleWorkout);
router.delete("/:id", deleteWorkout);

export default router;
