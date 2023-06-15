import express from "express";
import {
  generateToken,
  login,
  register,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/token", generateToken);
router.post("/login", login);
router.post("/register", register);

export default router;
