import Logger from "../utility/log.ts";
import { createRole, createAccount, readAccount, readRole } from "../models/accountModel.ts";
import { fetchAccountRole } from "./sharedController.ts";
import { signToken } from "../utility/security.ts";
import bcrypt from "bcrypt";
import { verifyTransaction } from "./utils.module.ts";

export async function register(req, res) {
  const log = Logger.generate("register");

  const { email, password } = req.body;
  const acc = await readAccount({ email: email });

  if (acc) {
    log.warn("account already existed");
    return res.status(400).json({
      success: false,
      message: "Already existed"
    });
  }

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
  
  const acc = await readAccount({ email: email });
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
  log.debug(`account id: ${ acc.account_id }`);

  // to fetch role name for authorization
  const acc_role = await fetchAccountRole({ account_id: acc.account_id });

  if (acc_role === undefined){
    log.warn("role is not set to account");
    return res.status(400).json({
      success: false,
      message: "Failed to get role"
    });
  }
  log.debug(`role of account: ${ acc_role }`);
  
  const auth = { id: acc.account_id, email: email, role: acc_role.role_name };
  log.debug(`id: ${ auth.id }, email: ${ auth.email }, and role ${ auth.role }`);

  log.debug("generate JWT token");
  const token = signToken(auth, "1h");

  res.cookie("access_token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 1000
  })

  return res.status(200).json({
    success: true,
    message: "Successful login",
    payload: {
      key: token
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

export async function logout(req, res) {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      sameSite: "lax"
    })
  } catch(error) {
    throw new Error("Failed to clear cookies");
  }
  
  res.status(201).json({ success: true, msg: "Successful Cleared Cookies" });
}
