import Logger from "../utility/log.ts";
import { verifyTransaction, verifyRecieved } from "./utils.module.ts";
import { createMetric } from "../models/metricModel.ts";
import { 
  addCareerMetric, 
  fetchCareerMetric, 
  addSubjectMetric, 
  fetchSubjectMetric 
} from "./sharedController.ts";

export async function addMetric(req, res) {
  const log = Logger.generate("addMetric");
  
  const { metric_name } = req.body;
  log.debug(`metric name: ${ metric_name }`);

  const result = await createMetric({ metric_name: metric_name });

  return verifyTransaction(result, res);
}

export async function addCareerScore(req, res) {
  const log = Logger.generate("addCareerScore");

  const { career_id, metric_id, score_bias } = req.body;

  const result = await addCareerMetric({
    career_id: career_id,
    metric_id: metric_id,
    score_bias: score_bias
  })

  return verifyTransaction(result, res);
}

export async function fetchCareerScore(req, res) {
  const log = Logger.generate("fetchCareerScore");

  const { career_name } = req.query;
  const result = await fetchCareerMetric({ career_name: career_name });

  return verifyRecieved(result, res);
}

export async function addSubjectScore(req, res) {
  const log = Logger.generate("addSubjectScore");

  const { subject_id, metric_id, score_bias } = req.body;

  const result = await addSubjectMetric({
    subject_id: subject_id,
    metric_id: metric_id,
    score_bias: score_bias
  })

  return verifyTransaction(result, res);
}

export async function fetchSubjectScore(req, res) {
  const log = Logger.generate("fetchSubjectScore");

  const { subject_name } = req.query;
  const result = await fetchSubjectMetric({ subject_name: subject_name });

  return verifyRecieved(result, res);
}
