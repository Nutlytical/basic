import { Pool } from "pg";

export default new Pool({
  user: "postgres",
  password: "abc123",
  host: "localhost",
  port: 5432,
  database: "postgres",
});
