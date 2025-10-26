import pool from "../utility/db.js";
import Logger from "../utility/log.ts";
import { verifyCreate, verifyRead } from "./utils.module.ts";

type CareerType = {
  career_name: string;
  description?: string;
};

export async function createCareer(req: CareerType) {
  const log = Logger.generate("createCareer");
  log.info("model called");

  log.debug(`career_name: ${ req.career_name }`);
  const result = await pool.query(
    `
      INSERT INTO careers
      (career_name, description)
      VALUES ($1, $2)
    `, [req.career_name, req.description]
  );
  
  log.debug("finished result");
  return verifyCreate(result, log);
}

export async function readCareer(req: CareerType) {
  const log = Logger.generate("readCareer");
  log.info("model called");

  const result = await pool.query(
    `
      SELECT * FROM careers 
      WHERE career_name = $1
    `, [req.career_name]
  );

  log.debug("finished result");
  return verifyRead(result, log);
}
