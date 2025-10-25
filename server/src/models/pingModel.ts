import pool from "../utility/db.js";
import Logger from "../utility/log.ts";

type ReadTableType = {
  table_name: string;
};

// if you need to check if the table is accessible 
// or it has the correct structure, then we can use
// this to test a specific table 
export async function readAttr(req: ReadTableType) {
  const log = Logger.generate("readAttr");
  log.debug(`request: ${ req.table_name }`);

  const result = await pool.query(
    `
      SELECT
        column_name,
        data_type,
        is_nullable,
        column_default
      FROM 
        information_schema.columns
      WHERE
        table_name = $1 AND table_schema = 'public'
    `,
    [req.table_name]
  );

  if (result.rows.length > 0) {
    log.debug("rows selected");
    return result.rows[0];
  }
  else {
    log.warn("no result matched");
    return undefined;
  }
}

export async function readNow() {
  const log = Logger.generate("readNow");

   const result = await pool.query(
    `SELECT NOW()`
  );
  
  if (result) {
    log.debug(result.rows[0].now );
    return result.rows[0];
  }
  else {
    return undefined;
  }
}
