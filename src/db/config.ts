import * as dotenv from "dotenv";
dotenv.config();

// 디비 정보 파일 .env에서 불러옴
export const config = {
  type: "mysql",
  host: process.env.DB_HOST!,
  username: process.env.DB_USER!,
  password: process.env.DB_PASS!,
  database: process.env.DB_NAME!,
  port: 3306 || process.env.DB_PORT,
  entities: ["./src/models/*.ts"],
  logging: ["query", "error"]
};
