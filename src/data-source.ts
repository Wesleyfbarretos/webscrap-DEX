import "reflect-metadata";
import { DataSource } from "typeorm";
import {
  PokemonEntity,
  AbilityEntity,
  TypeEntity,
  SpriteEntity,
} from "./entity/index";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "test6",
  synchronize: false,
  logging: false,
  entities: [PokemonEntity, AbilityEntity, SpriteEntity, TypeEntity],
  migrations: [],
  subscribers: [],
});
