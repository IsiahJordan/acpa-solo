// This is model is every table that is designed as 
// a jfunction table that connects two more table 
// hence why it is called shareModel
import pool from "../utility/db.js";
import Logger from "../utility/log.ts";
import { verifyCreate, verifyRead, verifyReads } from "./utils.module.ts";

type CareerMetricType = {
  career_id: number;
  metric_id: number;
  score_bias?: number;
};

type AccountRoleType = {
  account_id: string;
  role_id?: number;
};

type SectionAssignmentType = {
  section_name?: string;
  section_id: string;
  question_id: string;
};

export async function createCareerMetric(req: CareerMetricType) {
  const log = Logger.generate("createCareerMetric");
  log.info("model called");

  const result = pool.query(
    `
      INSERT INTO career_metric
      (career_id, metric_id, score_bias)
      VALUES ($1, $2)
    `, [req.career_id, req.metric_id, req.score_bias]
  );
  
  log.debug("finished result");
  return verifyCreate(result, log);

}

export async function readCareerMetric(req: CareerMetricType) {
  const log = Logger.generate("readMetricCareer");
  log.info("model called");

  const result = pool.query(
    `
      SELECT * FROM career_metrics 
      WHERE career_id = $1 AND metric_id = $2
    `, [req.career_id, req.metric_id]
  );

  log.debug("finished result");
  return verifyRead(result, log);
}

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
