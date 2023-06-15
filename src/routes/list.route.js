import express from "express";
import {
  createList,
  getAllLists,
  getListById,
  addFavoriteToList,
  deleteList
} from "../controllers/list.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/",verifyToken, createList);
router.get("/", verifyToken,getAllLists);
router.get("/:listId",verifyToken, getListById);
router.post("/:listId/favorites",verifyToken, addFavoriteToList);
router.delete("/:id",verifyToken, deleteList);
export default router;
