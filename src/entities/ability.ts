import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { PokemonEntity } from "./pokemon";

@Entity({ name: "ability" })
export class AbilityEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "name" })
  name: string;

  @Column({ name: "is_hidden" })
  isHidden: boolean;

  @ManyToMany(() => PokemonEntity, (pokemon) => pokemon.abilities)
  pokemons: PokemonEntity[];
}
