import Logger from "../utility/log.ts";
import { verifyToken } from "../utility/security.ts";

export async function fetchJWTRole(req, res) {
  const log = Logger.generate("fetchJWTRole");
  const token = req.cookies.access_token;
  
  if (!token) return res.status(400).json({ success: false, message: "You don't have token"});

  const decoded = await verifyToken(token);

  return res.status(200).json({ success: true, message: "Success decryption", payload: { role: decoded.role } });
}
