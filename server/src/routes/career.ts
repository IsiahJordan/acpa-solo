import express from 'express';

// controllers 
import { addCareer, fetchCareer } from '../controllers/careerController.ts';

// middleware 
import { requireBody, requireParams } from "../middleware/validation.ts";

const router = express.Router();

router.get("/add", requireParams, addCareer);
router.get("/fetch", requireParams, fetchCareer);

export default router;
