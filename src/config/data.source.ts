import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
  path:
    process.env.NODE_ENV !== undefined
      ? `.${process.env.NODE_ENV.trim()}.env`
      : ".env",
});

const Config: DataSourceOptions = {
  type: "postgres",
  host: process.env.DBP_HOST,
  port: Number(process.env.DBP_PORT),
  username: process.env.DBP_USER,
  password: process.env.DBP_PASSWORD,
  database: process.env.DBP_DATABASE,
  entities: [__dirname + "/../modulos/**/*.entity{.ts,.js}"],
  //migrations: [__dirname + "/../migrations/*{.ts,.js}"],
  synchronize: true,
  migrationsRun: false,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
};

export const AppDataSource: DataSource = new DataSource(Config);
