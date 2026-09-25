import express from "express";
import checkToken from "../middlewares/checkToken.js";
import {
  createGoal,
  deleteGoal,
  listGoals,
  updateGoal,
} from "../controller/goalController.js";

const router = express.Router();

router.use(checkToken);
router.get("/", listGoals);
router.post("/", createGoal);
router.put("/:id", updateGoal);
router.delete("/:id", deleteGoal);

export default router;
