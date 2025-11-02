// This is model is every table that is designed as 
// a jfunction table that connects two more table 
// hence why it is called shareModel
//
// Also add function requires ids of two table to be useable 
// THIS IS VERY IMPORTANT TO KNOW

import pool from "../utility/db.js";
import Logger from "../utility/log.ts";
import { verifyCreate, verifyRead, verifyReads } from "./utils.module.ts";

type AccountRoleType = {
  account_id: string;
  role_id?: number;
};

type SectionAssignmentType = {
  section_name?: string;
  section_id: string;
  question_id: string;
};

// this for both career and subject metrics 
type MetricScoreType = {
  subject_name?: string;
  career_name?: string;
};

type ExamSectionType = {
  exam_id: string;
  section_id?: string;
};

// solo insert into _metrics table 
type MetricConnType = {
  subject_id?: number;
  career_id?: number;
  metric_id: number;
  score_bias: number;
};

type ClassroomType = {
  class_id?: string;
  exam_id?: string;
  account_id?: string;
};

// you propably need to use readAccount to get the id
export async function createAccountRole(req: AccountRoleType) {
  const log = Logger.generate("createMetric");
  log.info("model called");

  const result = pool.query(
    `
      INSERT INTO account_roles 
      (account_id, role_id)
      VALUES ($1, $2)
    `, [req.account_id, req.role_id]
  );
  
  log.debug("finished result");
  return verifyCreate(result, log);
}


// this role gets the role name
export async function readAccountRole(req: AccountRoleType) {
  const log = Logger.generate("readAccountRole");
  log.info("model called");

  const result = await pool.query(
    `
      SELECT role_name, access_level FROM roles
      INNER JOIN account_roles
      ON account_roles.role_id = roles.role_id
      WHERE account_roles.account_id = $1
    `, [req.account_id]
  );

  log.debug("finished result");
  return verifyRead(result, log);
}

export async function createSectionAssignment(req: SectionAssignmentType) {
  const log = Logger.generate("createSectionAssignment");
  log.info("model called");

  const result = await pool.query(
    `
      INSERT INTO section_assignments
      (section_id, question_id)
      VALUES ($1, $2)
    `, [req.section_id, req.question_id]
  );

  log.debug("finished result");
  return verifyCreate(result, log);
}

export async function readSectionAssignment(req: SectionAssignmentType) {
  const log = Logger.generate("fetchSectionAssignment");
  log.info("model called");

  const result = await pool.query(
    `
      SELECT * FROM questions AS q
      INNER JOIN section_assignments AS sa ON
      sa.question_id = q.question_id       
      INNER JOIN sections AS s ON
      s.section_id = sa.section_id
      WHERE s.section_name = $1
    `, [req.section_name]
  );

  log.debug("finished result");
  return verifyReads(result, log);
}

export async function createSubjectMetric(req: MetricConnType) {
  const log = Logger.generate("createSubjectMetric");
  log.info("model called");
  
  const result = await pool.query(
    `
      INSERT INTO subject_metrics
      (subject_id, metric_id, score_bias)
      VALUES ($1, $2, $3)
    `, [req.subject_id, req.metric_id, req.score_bias]
  );

  log.debug("finished result");
  return verifyCreate(result, log);
}

export async function readSubjectMetric(req: MetricScoreType) {
  const log = Logger.generate("readSubjectMetric");
  log.info("model called");

  const result = await pool.query(
    `
      SELECT
        m.metric_name AS metric_name, 
        ms.score_bias AS score_bias
      FROM metrics AS m
      INNER JOIN subject_metrics AS ms ON 
      ms.metric_id = m.metric_id 
      INNER JOIN subjects AS s ON 
      s.subject_id ON ms.subject_id 
      WHERE s.subject_name = $1
    `, [req.subject_name]
  );
  
  log.debug("finished result");
  return verifyReads(result, log);
}

export async function createCareerMetric(req: MetricConnType) {
  const log = Logger.generate("createCareerMetric");
  log.info("model called");
  
  const result = await pool.query(
    `
      INSERT INTO career_metrics
      (career_id, metric_id, score_bias)
      VALUES ($1, $2, $3)
    `, [req.career_id, req.metric_id, req.score_bias]
  );

  log.debug("finished result");
  return verifyCreate(result, log);
}

export async function readCareerMetric(req: MetricScoreType) {
  const log = Logger.generate("readCareerMetric");
  log.info("model called");

  const result = await pool.query(
    `
      SELECT 
        m.metric_name AS metric_name, 
        ms.score_bias AS score_bias
      FROM metrics AS m 
      INNER JOIN career_metrics AS ms ON 
      ms.metric_id = m.metric_id 
      INNER JOIN careers AS c ON 
      c.career_id ON ms.career_id 
      WHERE c.career_name = $1
    `, [req.career_name]
  );
  
  log.debug("finished result");
  return verifyReads(result, log);
}

export async function createClassroomExam(req: ClassroomType) {
  const log = Logger.generate("createClassroomExam");
  log.info("model called");
  log.debug(req.class_id);

  const result = await pool.query(
    `
      INSERT INTO exam_rooms
      (class_id, exam_id)
      VALUES ($1, $2)
    `, [req.class_id, req.exam_id]
  );

  log.debug("finished result");
  return verifyCreate(result, log);
}

export async function createClassroomAccount(req: ClassroomType) {
  const log = Logger.generate("createClassroomAccount");
  log.info("model called");

  const result = await pool.query(
    `
      INSERT INTO account_class
      (class_id, account_id)
      VALUES ($1, $2)
    `, [req.class_id, req.account_id]
  );

  log.debug("finished result");
  return verifyCreate(result, log);
}

export async function readClassroomAccount(req: ClassroomType) {
  const log = Logger.generate("readClassroomAccount");
  log.info("model called");

  const result = await pool.query(
    `
      SELECT * FROM account_class
      WHERE account_id = $1
    `, [req.account_id]
  );

  log.debug("finished result");
  return verifyReads(result, log);
}

export async function readClassroomExam(req: ClassroomType) {
  const log = Logger.generate("readClassroomExam");
  log.info("model called");

  const result = await pool.query(
    `
      SELECT * FROM exam_rooms
      WHERE class_id = $1
    `, [req.class_id]
  );

  log.debug("finished result");
  return verifyReads(result, log);
}

export async function createExamSection(req: ExamSectionType) {
  const log = Logger.generate("createExamSection");
  log.info("model called");

  const result = await pool.query(
    `
      INSERT INTO exam_lists
      (exam_id, section_id)
      VALUES ($1, $2)
    `, [req.exam_id, req.section_id]
  );

  log.debug("finished result");
  return verifyCreate(result, log);
}

export async function readExamSection(req: ExamSectionType) {
  const log = Logger.generate("readExamSection");
  log.info("model called");

  const result = await pool.query(
    `
      SELECT * FROM exam_lists AS e 
      INNER JOIN sections AS s ON
      s.section_id = e.section_id
      WHERE exam_id = $1
    `, [req.exam_id]
  );

  log.debug("finished result");
  return verifyReads(result, log);
}
