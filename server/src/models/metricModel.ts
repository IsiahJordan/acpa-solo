import pool from "../utility/db.js";
import Logger from "../utility/log.ts";
import { verifyCreate } from "./utils.module.ts";

type MetricType = {
  metric_name: string;
};

export async function createMetric(req: MetricType) {
  const log = Logger.generate("createMetric");
  log.info("model called");

  log.debug(`metric_name: ${ req.metric_name }`);
  const result = await pool.query(
    `
      INSERT INTO metrics
      (metric_name)
      VALUES ($1)
    `, [req.metric_name]
  );
  
  log.debug("finished result");
  return verifyCreate(result, log);
}

export async function readMetric(req: MetricType) {
  const log = Logger.generate("readMetric");
  log.info("model called");

  const result = await pool.query(
    `
      SELECT * FROM metrics
      WHERE metric_name = $1
    `, [req.metric_name]
  );

  return verifyRead(result, log);
}
