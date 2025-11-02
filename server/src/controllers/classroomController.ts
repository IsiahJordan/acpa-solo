import Logger from "../utility/log.ts";
import { createClassroom, readClassroom } from "../models/classroomModel.ts";
import { verifyTransaction, verifyRecieved } from "./utils.module.ts";
import { addClassroomAccount, addClassroomExam, fetchClassroomAccount, fetchClassroomExam } from "./sharedController.ts";
import { genCharCode, verifyToken } from "../utility/security.ts";

export async function addClassroom(req, res) {
  const log = Logger.generate("addClassroom");

  const code = genCharCode(5);
  const result = await createClassroom({ code: code });

  return verifyTransaction(result, res);
}

export async function fetchClassroom(req, res) {
  const log = Logger.generate("fetchClassroom");
  const { code } = req.query;

  const result = await readClassroom({ code: code });

  return verifyRecieved(result, res);
}

// add account to class 
export async function addStudent(req, res) {
  const log = Logger.generate("addStudent");
  const { class_id } = req.body;
  const token = req.cookies.access_token;

  const decoded = await verifyToken(token);
  if (!decoded) {
    log.debug("failed to get token");
    return res.status(400).json({
      success: false,
      message: "Failed to decode token"
    })
  }


  log.debug(`account id: ${ decoded.id } and class id: ${ class_id }`);

  const result = await addClassroomAccount({ account_id: decoded.id, class_id: class_id });
  return verifyTransaction(result, res);
}

export async function fetchStudent(req, res) {
  const log = Logger.generate("fetchStudent");
  const token = req.cookies.access_token;

  const decoded = await verifyToken(token);
  if (!decoded) {
    log.debug("failed to get token");
    return res.status(400).json({
      success: false,
      message: "Failed to decode token"
    })
  }

  const result = await fetchClassroomAccount({ account_id: decoded.id });

  return verifyRecieved(result, res);
}

// adding exam to class 
export async function addActivity(req, res) {
  const log = Logger.generate("addActivity");
  const { exam_id, class_id } = req.body;
  log.debug(class_id);

  const result = await addClassroomExam({ exam_id: exam_id, class_id: class_id });
  return verifyTransaction(result, res);

}

export async function fetchActivity(req, res) {
  const log = Logger.generate("fetchActivity");
  const { class_id } = req.query;
  log.debug(class_id);

  const result = await fetchClassroomExam({ class_id: class_id });

  return verifyRecieved(result, res);
}
