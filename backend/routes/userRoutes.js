import express from "express";
import { register, login } from "../controllers/userController.js";
import { registerValidations, loginValidations } from "../validations/userValidations.js";
const router = express.Router();

router.post("/register", registerValidations, register);
router.post("/login", loginValidations, login);

export default router;