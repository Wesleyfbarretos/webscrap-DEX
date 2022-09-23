import "reflect-metadata";
import { DataSource } from "typeorm";
import {
  PokemonEntity,
  AbilityEntity,
  TypeEntity,
  SpriteEntity,
} from "./entities/index";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: [PokemonEntity, AbilityEntity, SpriteEntity, TypeEntity],
  migrations: [],
  subscribers: [],
});
