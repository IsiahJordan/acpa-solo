import jwt from "jsonwebtoken";
import * as crypto from "node:crypto";
import "dotenv/config";

export function signToken(data, expires){ 
  const token = jwt.sign(
    data,
    process.env.JWT_TOKEN,
    { expiresIn: expires }
  );
  return token;
}

export function verifyToken(token){
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    return decoded;
  } catch(err) {
    throw new Error("Invalid or expired token");
  }
}

export function genCharCode(length) {
  const code = crypto.randomBytes(length).toString("hex");
  return code;
}
