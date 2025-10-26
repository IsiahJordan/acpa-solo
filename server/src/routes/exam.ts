import express from 'express';

// controllers 
import { 
  addExam, 
  fetchExam,
  addSection,
  fetchSection,
  addQuestion,
  fetchQuestion,
  addSectionContent,
  fetchSectionContent,
  addSubject,
  fetchSubject
} from '../controllers/examController.ts';

// middleware 
import { requireBody, requireParams } from "../middleware/validation.ts";
import { authToken, isAuthorize } from "../middleware/auth.ts";

const router = express.Router();

router.post("/exam/add", requireBody, authToken, isAuthorize, addExam);
router.get("/exam/fetch", requireParams, fetchExam);
router.post("/section/add", requireBody, authToken, isAuthorize, addSection);
router.get("/section/fetch", requireParams, fetchSection);
router.post("/question/add", requireBody, authToken, isAuthorize, addQuestion);
router.get("/question/fetch", requireParams, fetchQuestion);
router.post("/subject/add", requireBody, authToken, isAuthorize, addSubject);
router.get("/subject/fetch", requireParams, fetchSubject);

// additional routes for jfunction tables 

router.post("/section/question/add", requireBody, authToken, isAuthorize, addSectionContent);
router.get("/section/question/fetch", requireParams, fetchSectionContent);

export default router;
