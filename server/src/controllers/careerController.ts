import pool from "../utility/db.js";
import Logger from "../utility/log.ts";
import { createCareer, readCareer } from "../models/careerModel.ts";
import { verifyTransaction, verifyRecieved } from "./utils.module.ts";

export async function addCareer(req, res) {
  const log = Logger.generate("addCareer");
  
  const { career_name, description } = req.body;
  log.debug(`career name: ${ career_name } and description: ${ description }`);

  const result = await createCareer({ 
    career_name: career_name, 
    description: description 
  });

  return verifyTransaction(result, res);
}

export async function fetchCareer(req, res) {
  const log = Logger.generate("fetchCareer");

  const { career_name } = req.query;
  log.debug(`career name: ${ career_name }`);

  const result = await readCareer({ 
    career_name: career_name
  });

  return verifyRecieved(result, res);
}
