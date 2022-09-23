import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { PokemonEntity } from "./pokemon";

@Entity({ name: "type" })
export class TypeEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "name" })
  name: string;

  @ManyToMany(() => PokemonEntity, (pokemon) => pokemon.types)
  pokemons: PokemonEntity[];
}
