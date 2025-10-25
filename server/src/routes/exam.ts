import express from 'express';

// controllers 
import { 
  addExam, 
  fetchExam,
  addSection,
  fetchSection,
  addQuestion,
  fetchQuestion,
  addSubject,
  fetchSubject
} from '../controllers/examController.ts';

// middleware 
import { requireBody, requireParams } from "../middleware/validation.ts";

const router = express.Router();

router.get("/exam/add", requireParams, addExam);
router.get("/exam/fetch", requireParams, fetchExam);
router.get("/section/add", requireParams, addSection);
router.get("/section/fetch", requireParams, fetchSection);
router.get("/question/add", requireParams, addQuestion);
router.get("/question/fetch", requireParams, fetchQuestion);
router.get("/subject/add", requireParams, addSubject);
router.get("/subject/fetch", requireParams, fetchSubject);

export default router;
