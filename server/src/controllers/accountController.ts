import Logger from "../utility/log.ts";
import { createRole, createAccount, readAccount } from "../models/accountModel.ts"
import bcrypt from "bcrypt";
import { verifyTransaction } from "./utils.module.ts";

export async function register(req, res) {
  const log = Logger.generate("register");

  const { email, password } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);
  log.debug("password hashed");
  
  const user = await createAccount({ email: email, password: passwordHash });
  
  verifyTransaction(user, res);
}

// get first the account if it exist 
// then match the password 
export async function login(req, res) {
  const log = Logger.generate("login");

  const { email, password } = req.body;
  
  const acc = await readAccount({ email });
  if (!acc) return res.status(400).json({ 
    success: false,
    message: "Failed to get account"
  });

  log.debug("success with finding account");

  const match = await bcrypt.compare(password, acc.password);
  if (!match) return res.status(400).json({
    success: false,
    message: "Password doesn't match"
  });

  log.debug("success with the password");

  return res.status(200).json({
    success: true,
    message: "Successful login",
    payload: {
      key: "test"
    }
  })
}

export async function addRole(req, res) {
  const log = Logger.generate("newRole");

  const { role, level } = req.query;
  log.debug(role);

  const result = await createRole({ role_name: role, level: level });
  
  verifyTransaction(user, res);
}
