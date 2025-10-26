import express from "express";
import { default as pingRouter } from "./ping.ts";
import { default as accountRouter } from "./account.ts";
import { default as careerRouter } from "./career.ts";
import { default as examRouter } from "./exam.ts";
import { default as metricRouter } from "./metric.ts";

const router = express.Router();

router.use("/ping", pingRouter);
router.use("/account", accountRouter);
router.use("/career", careerRouter);
router.use("/exam", examRouter);
router.use("/metric", metricRouter);

export default router;
