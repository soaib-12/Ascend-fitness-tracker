import express from "express";
import checkToken from "../middlewares/checkToken.js";
import { signup, login , getMe, logout} from "../controller/authController.js";

const router = express.Router();

router.get("/test", (req, res) => {
    res.json({
        message: "Auth route is working",
    });
});

router.post("/signup", signup);
router.post("/login", login);
router.get("/protected", checkToken, (req, res) => {
    res.json({
        message: "You are authenticated",
        userId: req.userId,
    });
});
router.get("/me", checkToken, getMe);
router.post("/logout", logout);
export default router;