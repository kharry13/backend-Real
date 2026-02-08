import { Router } from "express";
import registerUser from "../controllers/user.controller.js";

const router = Router();

// http://localhost:8000/api/v1/users/register -> now give control to registerUser
router.route("/register").post(registerUser);

export default router;
