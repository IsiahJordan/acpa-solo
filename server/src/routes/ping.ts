// THIS IS TO TEST CONNECTION AS WELL
// TO PROTOTYPE REQUEST
//
// NEVER DEPLOY THIS WITH THIS ROUTE ON!!!!

import express from 'express';

// controllers 
import { pingServer, pingTable, pingDatabase } from '../controllers/pingController.ts';

// middleware 
import { requireBody, requireParams } from "../middleware/validation.ts";

const router = express.Router();

router.post("/send", requireBody, pingServer);
router.get("/sync", pingDatabase);
router.get("/schema", requireParams, pingTable);

export default router;
