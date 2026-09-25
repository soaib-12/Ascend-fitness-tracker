import express from "express";
import checkToken from "../middlewares/checkToken.js";
import {
  createWorkout,
  listWorkouts,
  toggleWorkout,
} from "../controller/workoutController.js";

const router = express.Router();

router.use(checkToken);
router.get("/", listWorkouts);
router.post("/", createWorkout);
router.patch("/:id/toggle", toggleWorkout);

export default router;
