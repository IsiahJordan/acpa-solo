import Logger from "../utility/log.ts";
import { readAttr, readNow } from "../models/pingModel.ts";

export function pingServer(req, res) {
  const log = Logger.generate("pingServer");

  const { message } = req.body;
  log.info("controller called");

  return res.status(200).json({ 
    success: true, 
    message: `This is your message ${ message }` 
  });
}

export async function pingTable(req, res) {
  const log = Logger.generate("pingTable");
  
  const { table_name } = req.query;
  log.debug(`table name: ${ table_name }`);

  const result = await readAttr({ table_name });
  
  if (result === undefined) {
    log.warn("result undefined");
    return res.status(400).json({ 
      success: false, 
      message: "Failed to read table"
    });
  }

  return res.status(200).json({ 
    success: true, 
    message: `Found ${ table_name } table information`,
    payload: { data: result }
  });
}

export async function pingDatabase(req, res) {
  const log = Logger.generate("pingDatabase");

  const result = await readNow(); // this is to test if it gives the NOW() result

  if (result === undefined) {
    log.error("database failed to connect");
    return res.status(400).json({ 
      success: false, 
      message: "Failed to connect"
    });
  }

  return res.status(200).json({ 
    success: true, 
    message: `Successful result`
  });
}
