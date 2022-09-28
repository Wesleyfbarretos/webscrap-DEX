import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { PokemonEntity } from "./pokemon";

@Entity({ name: "sprite" })
export class SpriteEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "img", unique: true, nullable: true })
  img: string;

  @Column({ name: "name" })
  name: string;

  @ManyToOne(() => PokemonEntity, (pokemon) => pokemon.sprites)
  pokemon: PokemonEntity;
}
