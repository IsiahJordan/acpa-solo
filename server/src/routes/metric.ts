import express from 'express';

// controllers 
import { 
  addMetric, 
  addCareerScore, 
  fetchCareerScore, 
  addSubjectScore, 
  fetchSubjectScore 
} from '../controllers/metricController.ts';

// middleware 
import { requireBody, requireParams } from "../middleware/validation.ts";
import { authToken, isAuthorize } from "../middleware/auth.ts";

const router = express.Router();

router.post("/add", requireBody, authToken, isAuthorize, addMetric);
router.post("/career/add", requireBody, authToken, isAuthorize, addCareerScore);
router.post("/subject/add", requireBody, authToken, isAuthorize, addSubjectScore);
router.get("/career/fetch", requireParams, fetchCareerScore);
router.get("/subject/fetch", requireParams, fetchSubjectScore);



export default router;
