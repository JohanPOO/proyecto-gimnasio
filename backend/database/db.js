import { createPool } from "mysql2/promise";

export const connection = createPool({
  host: "localhost",
  user: "root",
  password: "mysql",
  port: 3306,
  database: "gimnasiodb",
});
