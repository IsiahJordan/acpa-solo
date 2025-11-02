import express from 'express';

// controllers 
import { register, login, addRole, logout } from '../controllers/accountController.ts';

// middleware 
import { requireBody, requireParams } from "../middleware/validation.ts";

const router = express.Router();

router.post("/register", requireBody, register);
router.post("/login", requireBody, login);
router.get("/role/new", requireParams, addRole);
router.post("/logout", logout);

export default router;
