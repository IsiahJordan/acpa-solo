// This is a reusable file for reusing 
// components that might repeated in 
// controller
//
// THIS IS ONLY FOR CONTROLLER OKAY :D

// this is just to check if input 
// or any create function returns 
// true or false 

import Logger from "../utility/log.ts";

export function verifyTransaction(state: bool, res: object) {
  const log = Logger.generate("verifyTransaction");
  if (!state) {
    log.debug("failed");
    return res.status(400).json({ 
      success: false, 
      message: "Failed transaction" 
    });
  }

  log.debug("success");
  return res.status(200).json({
    success: true, 
    message: "Successful transaction" 
  });

}

export function verifyRecieved(data: object, res: object) {
  if (!data) {
    return res.status(200).json({
      success: false,
      message: "Failed to fetch",
      payload: {
        data: []
      }
    });
  }

  return res.status(200).json({
    success: true,
    message: "Successful fetch",
    payload: {
      data: data
    }
  });
}
