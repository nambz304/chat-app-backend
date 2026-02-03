import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../feature/user/user.entity.js";
import { Group } from "../feature/group/group.entity.js";
import { Message } from "../feature/chat/message.entity.js";
import dotenv from 'dotenv';

dotenv.config();


 const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "FSIavYHOKYpCYOqikwiENJTX7ZqxM9fs",
  database: process.env.DB_NAME || "todo_db_smqc",
  ssl: {
    rejectUnauthorized: false, 
  },
  synchronize: true,//true: nếu chưa có bảng User, Group hoặc Message thì tự tạo
  logging: false,
  entities: [User, Group, Message],
  migrations: ["src/migrations/*.ts"],
});

export type AppDataSourceType = typeof AppDataSource;

export default AppDataSource;

// ✅ Debug: Print env vars
console.log('=== Database Config ===');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_USERNAME:', process.env.DB_USERNAME);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('========================');

