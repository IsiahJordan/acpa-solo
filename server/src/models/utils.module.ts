// This is a reusable file for reusing 
// components that might repeated in 
// model
//
// THIS IS ONLY FOR MODEL OKAY :D

import Logger from "../utility/log.ts";

// this is just to check if input 
// or any create function returns 
// true or false 
export function verifyCreate(result: object, log: Logger) {
  log.debug(JSON.stringify(result));
  if (result.rowCount > 0) {
    log.debug("successful insert");
    return true;
  }
  else {
    log.warn("failed to insert");
    return false;
  }
}

export function verifyUpdate(result: object) {
  if (result) {
    return result;
  }
  else {
    return undefined;
  }
}

export function verifyRead(result: object, log: Logger) {
  log.debug(result);
  if (result.rowCount > 0) {
    log.debug("Successful read to accounts");
    return result.rows[0];
  }

  log.warn("failed to find account");
  return undefined;
}

// dynamic update calls 
//
// pool : is the pool connection to the db 
// table : is the name of the table to be updated 
// change_column : is the column ( we are doing single updates )
// value : is the value that matches the type 
// id_column : is the where matchup and 
// id_value : is the appropriate match 
export async function updateTable(
  pool: object, 
  table: string, 
  change_column: string, 
  id_column: string,
  value: any,
  id_value: any
) {
   const result = await pool.query(
    `
      UPDATE ${ table } SET ${ change_column } = $1 
      WHERE ${ id_column } = $2
    `, [value, id_value]
  );

  return result;
}
