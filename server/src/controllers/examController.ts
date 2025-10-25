import pool from "../utility/db.js";
import Logger from "../utility/log.ts";
import { verifyTransaction, verifyRecieved } from "./utils.module.ts";
import { 
  createExam, readExam,
  createSection, readSection,
  createQuestion, readQuestion,
  createSubject, readSubject
} from "../models/examModel.ts";

export async function addExam(req, res) {
  const log = Logger.generate("addExam");
  
  const { exam_name, description, is_visible, attempts } = req.query;
  log.debug(`
    exam_name: ${ exam_name }, description: ${ description }, is_visible: ${ is_visible } and ${ attempts }
  `);

  const result = await createExam({ 
    exam_name: exam_name, 
    description: description, 
    is_visible: is_visible, 
    attempts: attempts 
  });

  return verifyTransaction(result, res);
}

export async function fetchExam(req, res) {
  const log = Logger.generate("fetchExam");

  const { exam_name } = req.query;
  log.debug(`exam_name: ${ exam_name }`);

  const result = await createExam({ exam_name: exam_name });

  return verifyRecieved(result, res);
}

export async function addSection(req, res) {
  const log = Logger.generate("addSection");

  const { section_name, description } = req.query;
  log.debug(`section_name: ${ section_name }, description: ${ description }`);

  const result = await createSection({ 
    section_name: section_name, 
    description: description, 
  });

  return verifyTransaction(result, res);
}

export async function fetchSection(req, res) {
  const log = Logger.generate("fetchSection");

  const { section_name } = req.query;
  log.debug(`section_name: ${ section_name }`);

  const result = await createSection({ 
    section_name: section_name
  });

  return verifyRecieved(result, res);
}

export async function addQuestion(req, res) {
  const log = Logger.generate("addQuestion");

  const { question_name, content } = req.query;
  log.debug(`question_name: ${ question_name }`);

  const result = await createQuestion({ 
    question_name: question_name,
    content: content
  });

  return verifyTransaction(result, res);
}

export async function fetchQuestion(req, res) {
  const log = Logger.generate("fetchQuestion");

  const { question_name } = req.query;
  log.debug(`question_name: ${ question_name }`);

  const result = await readQuestion({ 
    question_name: question_name
  });

  return verifyRecieved(result, res);
}

export async function addSubject(req, res) {
  const log = Logger.generate("addSubject");

  const { subject_name } = req.query;
  log.debug(`subject_name: ${ subject_name }`);

  const result = await createSubject({ 
    subject_name: subject_name
  });

  return verifyTransaction(result, res);
}

export async function fetchSubject(req, res) {
  const log = Logger.generate("fetchSubject");

  const { subject_name } = req.query;
  log.debug(`subject_name: ${ subject_name }`);

  const result = await readSubject({ 
    subject_name: subject_name
  });

  return verifyRecieved(result, res);
}
