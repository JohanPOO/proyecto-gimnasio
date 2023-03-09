import { createPool } from "mysql2/promise";

export const connection = createPool({
  host: "localhost",
  user: "root",
  password: "",
  port: 3306,
  database: "gimnasio",
});
