import { Pool } from "pg";
import "dotenv/config";
import Logger from "../utility/log.ts";

Logger.generate("Pool").debug(
  `user: ${ process.env.DB_USER }, host: ${ process.env.DB_HOST }, database: ${ process.env.DB_NAME }, port: ${ process.env.DB_PORT }`
);

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

export default pool;
