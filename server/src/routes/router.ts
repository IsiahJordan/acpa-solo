import express from "express";
import { default as pingRouter } from "./ping.ts";
import { default as accountRouter } from "./account.ts";
import { default as careerRouter } from "./career.ts";

const router = express.Router();

router.use("/ping", pingRouter);
router.use("/account", accountRouter);
router.use("/career", careerRouter);

export default router;
