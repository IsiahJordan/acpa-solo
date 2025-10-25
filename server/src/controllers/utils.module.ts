// This is a reusable file for reusing 
// components that might repeated in 
// controller
//
// THIS IS ONLY FOR CONTROLLER OKAY :D

// this is just to check if input 
// or any create function returns 
// true or false 
export function verifyTransaction(state: bool, res: object) {
  if (!state) {
    return res.status(400).json({ 
      success: false, 
      message: "Failed transaction" 
    });
  }

  return res.status(200).json({
    success: true, 
    message: "Successful transaction" 
  });

}

export function verifyRecieved(data: object, res: object) {
  if (!data) {
    return res.status(400).json({
      success: false,
      message: "Failed to fetch",
      payload: {
        data: undefined
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
