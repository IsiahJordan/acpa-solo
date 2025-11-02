import pool from "../utility/db.js";
import Logger from "../utility/log.ts";
import { verifyCreate, verifyRead } from "./utils.module.ts";

type ClassroomType = {
  code: string;
};

export async function createClassroom(req: ClassroomType) {
  const log = Logger.generate("createClassroom");
  log.info("model called");

  log.debug(`code: ${ req.code }`);
  const result = await pool.query(
    `
      INSERT INTO classrooms
      (code)
      VALUES ($1)
    `, [req.code]
  );
  
  log.debug("finished result");
  return verifyCreate(result, log);
}

export async function readClassroom(req: ClassroomType) {
  const log = Logger.generate("readClassroom");
  log.info("model called");

  log.debug(`code: ${ req.code }`);
  const result = await pool.query(
    `
      SELECT * FROM classrooms 
      WHERE code = $1
    `, [req.code]
  );
  
  log.debug("finished result");
  return verifyRead(result, log);
}

