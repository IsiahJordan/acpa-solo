import Logger from "../utility/log.ts";

export function requireBody(req, res, next) {
  const log = Logger.generate("requireBody");
  log.info("middleware called");

  if (req.body === undefined) {
    log.error("wrong req format");
    return res.status(400).json({ 
      success: false, 
      message: "Failed request"
    });
  }

  log.info("validation successful");
  next();
}

export function requireParams(req, res, next) {
  const log = Logger.generate("requireParams");
  log.info("middleware called");

  if (req.params === undefined) {
    log.error("wrong req format");
    return res.status(400).json({ 
      success: false, 
      message: "Failed request"
    });
  }

  log.info("validation successful");
  next();
}
