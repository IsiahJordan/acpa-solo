// This is model is every table that is designed as 
// a jfunction table that connects two more table 
// hence why it is called shareModel
import pool from "../utility/db.js";
import Logger from "../utility/log.ts";
import { verifyCreate, verifyRead } from "./utils.module.ts";

type CareerMetricType = {
  career_id: number;
  metric_id: number;
  score_bias?: number;
};

type AccountRoleType = {
  account_id: string;
  role_id?: number;
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


// this role gets the role id and if you which 
// to get the name, use role id with readRoles 
export async function readAccountRole(req: AccountRoleType) {
  const log = Logger.generate("readAccountRole");
  log.info("model called");

  const result = pool.query(
    `
      SELECT * FROM account_roles  
      WHERE account_id = $1
    `, [req.account_id]
  );

  log.debug("finished result");
  return verifyRead(result, log);
}

