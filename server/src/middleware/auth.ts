import Logger from "../utility/log.ts";
import { verifyToken } from "../utility/security.ts";
import { fetchAccessLevel } from "../controllers/sharedController.ts";

// authenticate
export async function authToken(req, res, next) {
  const log = Logger.generate("authToken");
  const token = req.cookies.access_token;

  if (!token) {
    log.error("account not authenticated");
    return res.status(403).json({ 
      success: false, 
      message: "You are not authenticate to use this request" 
    });
  }
  
  log.info("finish authenticating");
  next();
}

export async function isAuthorize(req, res, next) {
  const log = Logger.generate("isAuthorize");
  const token = req.cookies.access_token;
  
  const { role } = req.body;
  
  const decoded = await verifyToken(token);
  log.debug(`web role: ${ role } and token role: ${ decoded.role }`);
  
  const web_level = await fetchAccessLevel({ role: JSON.stringify(role) });
  
  if (!web_level) {
    log.error("No access level for website");
    return res.status(400).json({
      success: false,
      message: "Failed to get access level"
    });
  }

  log.debug("successful fetch web level")

  const token_level = await fetchAccessLevel({ role: decoded.role });

  if (!token_level) {
    log.error("No access level for account");
    return res.status(403).json({
      success: false,
      message: "Failed to get access level"
    });
  }

  log.debug(`token access level: ${ token_level.access_level } and web access level: ${ web_level.access_level }`);

  if (token_level.access_level < web_level.access_level) {
    log.warn("You don't have the authorization to access this feature");
    return res.status(403).json({
      success: false,
      message: "Failed to get access level"
    });
  }

  log.debug("end of auth");
  next();
}
