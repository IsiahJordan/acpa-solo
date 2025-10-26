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
import { authToken, isAuthorize } from "../middleware/auth.ts";

const router = express.Router();

router.post("/exam/add", requireBody, authToken, isAuthorize, addExam);
router.post("/exam/fetch", requireBody, authToken, isAuthorize, fetchExam);
router.post("/section/add", requireBody, authToken, isAuthorize, addSection);
router.post("/section/fetch", requireBody, authToken, isAuthorize, fetchSection);
router.post("/question/add", requireBody, authToken, isAuthorize, addQuestion);
router.post("/question/fetch", requireBody, authToken, isAuthorize, fetchQuestion);
router.post("/subject/add", requireBody, authToken, isAuthorize, addSubject);
router.post("/subject/fetch", requireBody, authToken, isAuthorize, fetchSubject);

export default router;
