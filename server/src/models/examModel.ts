import pool from "../utility/db.js";
import Logger from "../utility/log.ts";
import { verifyCreate, verifyRead } from "./utils.module.ts";

type ExamType = {
  exam_name: string;
  description?: string;
  is_visible?: "hidden" | "show" | "archive";
  attempts?: number;
};

type SectionType = {
  section_name: string;
  description?: string;
};

type QuestionType = {
  qustion_name: string;
  content?: uknown;  // this a jsonb for question 
};

type SubjectType = {
  subject_name: string;
};


export async function createExam(req: ExamType) {
  const log = Logger.generate("createExam");
  log.info("model called");

  log.debug(`exam_name: ${ req.exam_name }`);
  const result = await pool.query(
    `
      INSERT INTO exams
      (exam_name, description, is_visible, attempts_allowed)
      VALUES ($1, $2, $3, $4)
    `, [req.exam_name, req.description, req.is_visible, req.attempts]
  );
  
  log.debug("finished result");
  return verifyCreate(result, log);
}

export async function readExam(req: ExamType) {
  const log = Logger.generate("readExam");
  log.info("model called");

  const result = await pool.query(
    `
      SELECT * FROM exams
      WHERE exam_name = $1
    `, [req.exam_name]
  );
  
  log.debug("finished result");
  return verifyRead(result, log);
}

export async function createQuestion(req: QuestionType) {
  const log = Logger.generate("createQuestion");
  log.info("model called");

  const result = await pool.query(
    `
      INSERT INTO questions
      (content)
      VALUES ($1)
    `, [req.question_name, req.content]
  );
  
  log.debug("finished result");
  return verifyCreate(result, log);
}

export async function readQuestion(req: QuestionType) {
  const log = Logger.generate("readQuestion");
  log.info("model called");

  const result = await pool.query(
    `
      SELECT * FROM questions
      WHERE exam_name = $1
    `, [req.question_name]
  );
  
  log.debug("finished result");
  return verifyRead(result, log);
}

export async function createSection(req: SectionType) {
  const log = Logger.generate("createSection");
  log.info("model called");

  log.debug(`section_name: ${ req.section_name }`);
  const result = await pool.query(
    `
      INSERT INTO sections
      (section_name, description)
      VALUES ($1, $2)
    `, [req.section_name, req.description]
  );
  
  log.debug("finished result");
  return verifyCreate(result, log);
}

export async function readSection(req: SectionType) {
  const log = Logger.generate("readSection");
  log.info("model called");

  const result = await pool.query(
    `
      SELECT * FROM sections
      WHERE exam_name = $1
    `, [req.section_name]
  );
  
  log.debug("finished result");
  return verifyRead(result, log);
}

export async function createSubject(req: SubjectType) {
  const log = Logger.generate("createSubject");
  log.info("model called");

  log.debug(`subject_name: ${ req.subject_name }`);
  const result = await pool.query(
    `
      INSERT INTO subjects
      (subject_name)
      VALUES ($1)
    `, [req.subject_name]
  );
  
  log.debug("finished result");
  return verifyCreate(result, log);
}

export async function readSubject(req: SubjectType) {
  const log = Logger.generate("readSubject");
  log.info("model called");

  const result = await pool.query(
    `
      SELECT * FROM subject
      WHERE subject_name = $1
    `, [req.subject_name]
  );
  
  log.debug("finished result");
  return verifyRead(result, log);
}
