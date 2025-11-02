import express from 'express';

// controllers 
import { addClassroom, fetchClassroom, addStudent, fetchStudent, addActivity, fetchActivity } from '../controllers/classroomController.ts';

// middleware 
import { requireBody, requireParams } from "../middleware/validation.ts";
import { authToken, isAuthorize } from "../middleware/auth.ts";

const router = express.Router();

router.post("/add", requireBody, authToken, isAuthorize, addClassroom);
router.get("/fetch", requireParams, fetchClassroom);
router.post("/student/add", requireBody, authToken, isAuthorize, addStudent);
router.post("/student/fetch", requireParams, fetchStudent);
router.post("/activity/add", requireBody, authToken, isAuthorize, addActivity);
router.get("/activity/fetch", requireParams, fetchActivity);

export default router;
