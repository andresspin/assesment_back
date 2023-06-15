import express from "express";
import { getAllFavs } from "../controllers/fav.controller.js";
//import { verifyToken } from "../middlewares/auth.middleware.js";



const router = express.Router();


router.get("/",  getAllFavs);

export default router;