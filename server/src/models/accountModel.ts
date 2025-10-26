import pool from "../utility/db.js";
import Logger from "../utility/log.ts";
import { verifyCreate, verifyRead, verifyUpdate, updateTable } from "./utils.module.ts";

type AccountType = {
  email: string;
  password?: string;
  updated_at?: Date;
};

type RoleType = {
  email?: string;
  level?: number;
  role_name: string;
};

type ColumnAccountType = "email" | "password" | "updated_at";

export async function createAccount(req: AccountType) {
  const log = Logger.generate("createAccount");
  log.info("model called");
    
  log.debug(`email: ${ req.email }`);
  const result = await pool.query(
    `
      INSERT INTO accounts
      (email, password) VALUES
      ($1, $2)
    `, [req.email, req.password]
  );
  
  return verifyCreate(result, log);
}

export async function readAccount(req: AccountType) {
  const log = Logger.generate("readAccounts");
  log.info("model called");

  const result = await pool.query(
    `
      SELECT * FROM accounts
      WHERE email = $1
    `, [req.email]
  );

  return verifyRead(result, log);
}

export async function updateAccount(uuid: string, new_data: AccountType, req: "email" | "password" | "created_at") {
  const log = Logger.generate("updateAccount");
  log.info("model called");

  log.debug(`uuid: ${ uuid } and req: ${ req }`);
  // update table by using index
  const result = await updateTable({
    pool: pool,
    table: "accounts",
    change_column: req,
    id_column: "account_id",
    value: data[req],
    id_value: uuid
  });

  log.debug("finish result");

  return verifyUpdate(result);
}

export async function readRole(req: RoleType) {
  const log = Logger.generate("readRole");
  log.info("model called");
  log.debug(req.role_name);

  const result = await pool.query(
    `
      SELECT * FROM roles  
      WHERE role_name = $1
    `, [req.role_name]
  );

  log.debug("finished result");
  return verifyRead(result, log);
}

export async function createRole(req: RoleType) {
  const log = Logger.generate("createRole");
  log.info("model called");

  const values = [req.role_name];

  if (req.level) {
    log.debug("request level set");
    values.push(req.level);
  }
  else {
    log.debug("no level set");
    values.push(1);
  }
  
  const result = await pool.query(
    `
      INSERT INTO roles (role_name, access_level)
      VALUES ($1, $2)
    `, values
  );

  return verifyCreate(result, log);
}

