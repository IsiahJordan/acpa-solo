import express from 'express';

// controllers 
import { addCareer, fetchCareer } from '../controllers/careerController.ts';

// middleware 
import { requireBody, requireParams } from "../middleware/validation.ts";
import { authToken, isAuthorize } from "../middleware/auth.ts";

const router = express.Router();

router.post("/add", requireBody, authToken, isAuthorize, addCareer);
router.get("/fetch", requireParams, fetchCareer);

export default router;
