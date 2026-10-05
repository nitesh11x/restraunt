import express from "express";
import { addDish, deleteDishById, editDisheById, getAllDishes } from "../controllers/dish.controller.js";
import { isAdminAuth } from "../middlewares/auth.middleware.js";

const router = express.Router()

router.post('/add', isAdminAuth, addDish)
router.get('/all', getAllDishes)
router.put('/update/:id', isAdminAuth, editDisheById)
router.delete('/delete/:id', isAdminAuth, deleteDishById)

export default router