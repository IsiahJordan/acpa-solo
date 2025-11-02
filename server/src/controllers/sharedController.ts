// DO NOT MAKE AN ROUTER FOR THIS PLEAAAASEEEE
//
// this only used by other controllers

import pool from "../utility/db.js";
import Logger from "../utility/log.ts";
import { 
  readAccountRole, 
  createSectionAssignment, 
  readSectionAssignment,
  createCareerMetric,
  createSubjectMetric,
  readCareerMetric,
  readSubjectMetric,
  createClassroomExam,
  createClassroomAccount,
  readClassroomAccount,
  readClassroomExam,
  createExamSection,
  readExamSection
} from "../models/sharedModel.ts";
import { verifyTransaction, verifyRecieved } from "./utils.module.ts";
import { readRole } from "../models/accountModel.ts";

export async function fetchAccountRole(req) {
  const log = Logger.generate("fetchAccountRole");

  const result = await readAccountRole({ account_id: req.account_id });

  return result;
}

export async function fetchAccessLevel(req) {
  const log = Logger.generate("fetchAccessLevel");

  log.debug(`role send: ${ req.role } `);

  const result = await readRole({ role_name: req.role });
  log.debug(result);

  log.debug("end of call");
  return result;
}

export async function addSectionAssignment(req) {
  const log = Logger.generate("addSectionAssignment");

  const result = await createSectionAssignment({ section_id: req.section_id, question_id: req.question_id });

  log.debug("end of call");
  return result;
}

export async function fetchSectionAssignment(req) {
  const log = Logger.generate("fetchSectionAssignment");

  const result = await readSectionAssignment({ section_name: req.section_name });

  log.debug("end of call");
  return result;
}

export async function addCareerMetric(req) {
  const log = Logger.generate("addCareerMetric");
  
  log.debug(`score_bias: ${ req.score_bias }`);

  const result = await createCareerMetric({
    career_id: req.career_id,
    metric_id: req.metric_id,
    score_bias: req.score_bias
  })

  log.debug("end of call");
  return result;
}

export async function fetchCareerMetric(req) {
  const log = Logger.generate("fetchCareerMetric");

  const result = await readCareerMetric({ career_name: req.career_name })

  log.debug("end of call");
  return result;
}

export async function addSubjectMetric(req) {
  const log = Logger.generate("addSubjectMetric");
  
  log.debug(`score_bias: ${ req.score_bias }`);

  const result = await createSubjectMetric({
    subject_id: req.subject_id,
    metric_id: req.metric_id,
    score_bias: req.score_bias
  })

  log.debug("end of call");
  return result;
}

export async function fetchSubjectMetric(req) {
  const log = Logger.generate("fetchSubjectMetric");

  const result = await readSubjectMetric({ subject_name: req.subject_name })

  log.debug("end of call");
  return result;
}

export async function addClassroomExam(req) {
  const log = Logger.generate("addClassroomExam");
  log.debug(req.class_id);

  const result = await createClassroomExam({ class_id: req.class_id, exam_id: req.exam_id });
  return result;
}

export async function fetchClassroomExam(req) {
  const log = Logger.generate("fetchClassroomExam");

  const result = await readClassroomExam({ class_id: req.class_id });
  return result;
}

export async function addClassroomAccount(req) {
  const log = Logger.generate("addClassroomAccount");

  const result = await createClassroomAccount({ class_id: req.class_id, account_id: req.account_id });
  return result;
}

export async function fetchClassroomAccount(req) {
  const log = Logger.generate("fetchClassroomAccount");

  const result = await readClassroomAccount({ account_id: req.account_id });
  return result;
}

export async function addExamSection(req) {
  const log = Logger.generate("addExamSection");

  const result = await createExamSection({ exam_id: req.exam_id, section_id: req.section_id });
  return result;
}

export async function fetchExamSection(req) {
  const log = Logger.generate("fetchExamSection");

  const result = await readExamSection({ exam_id: req.exam_id });
  return result;
}
