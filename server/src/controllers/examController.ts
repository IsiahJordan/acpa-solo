import Logger from "../utility/log.ts";
import { verifyTransaction, verifyRecieved } from "./utils.module.ts";
import { 
  createExam, readExam,
  createSection, readSection,
  createQuestion, readQuestion,
  createSubject, readSubject
} from "../models/examModel.ts";
import { addSectionAssignment, fetchSectionAssignment, addExamSection, fetchExamSection } from "./sharedController.ts";

export async function addExam(req, res) {
  const log = Logger.generate("addExam");
  
  const { exam_name, description, is_visible, attempts, duration } = req.body;
  log.debug(`
    exam_name: ${ exam_name }, description: ${ description }, is_visible: ${ is_visible } and ${ attempts }
    duration: ${ duration }
  `);

  const result = await createExam({ 
    exam_name: exam_name, 
    description: description, 
    is_visible: is_visible, 
    attempts: attempts,
    duration: duration
  });

  return verifyTransaction(result, res);
}

export async function fetchExam(req, res) {
  const log = Logger.generate("fetchExam");

  const { exam_id } = req.query;

  const result = await readExam({ exam_id: exam_id });

  return verifyRecieved(result, res);
}

export async function addSection(req, res) {
  const log = Logger.generate("addSection");

  const { section_name, description } = req.body;
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

  const { question_name, content } = req.body;
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

export async function addSectionContent(req, res){
  const log = Logger.generate("addSectionContent");

  const { section_id, question_id } = req.body;
  log.debug(`section id: ${ section_id } and question id: ${ question_id }`);

  const result = await addSectionAssignment({ section_id: section_id, question_id: question_id });
  
  return verifyTransaction(result, res);
}

export async function fetchSectionContent(req, res){
  const log = Logger.generate("fetchSectionContent");

  const { section_name } = req.query;
  log.debug(`section name: ${ section_name }`);

  const result = await fetchSectionAssignment({ section_name: section_name});
  
  return verifyRecieved(result, res);
}

export async function addSubject(req, res) {
  const log = Logger.generate("addSubject");

  const { subject_name } = req.body;
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

export async function addExamList(req, res) {
  const log = Logger.generate("addExamList");

  const { exam_id, section_id } = req.body;

  const result = await addExamSection({ 
    exam_id: exam_id,
    section_id: section_id
  });

  return verifyTransaction(result, res);
}

export async function fetchExamList(req, res) {
  const log = Logger.generate("fetchExamList");

  const { exam_id } = req.query;
  log.debug(`exam_id: ${ exam_id }`);

  const result = await fetchExamSection({ 
    exam_id: exam_id
  });

  return verifyRecieved(result, res);
}

