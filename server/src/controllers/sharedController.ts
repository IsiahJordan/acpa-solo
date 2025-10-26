// DO NOT MAKE AN ROUTER FOR THIS PLEAAAASEEEE
//
// this only used by other controllers

import pool from "../utility/db.js";
import Logger from "../utility/log.ts";
import { readAccountRole } from "../models/sharedModel.ts";
import { verifyTransaction, verifyRecieved } from "./utils.module.ts";

export async function fetchAccountRole(req) {
  const log = Logger.generate("fetchAccountRole");

  const result = await readAccountRole({ account_id: req.account_id });

  return result;
}
