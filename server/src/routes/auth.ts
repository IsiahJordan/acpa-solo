import express from 'express';

// controllers 
import { fetchJWTRole } from '../controllers/authController.ts';

const router = express.Router();

router.post("/fetch/role", fetchJWTRole);

export default router;
