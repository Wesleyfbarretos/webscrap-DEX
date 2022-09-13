import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { PokemonEntity } from "./pokemon";

@Entity()
export class SpriteEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  // @Column({ name: "id_pokemon" })
  // idPokemon: number;

  @Column({ name: "img", unique: true })
  img: string;

  @Column({ name: "name" })
  name: string;

  @OneToMany(() => PokemonEntity, (pokemon) => pokemon.sprites)
  pokemon: PokemonEntity;
}
