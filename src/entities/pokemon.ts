import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { AbilityEntity } from "./ability";
import { SpriteEntity } from "./sprite";
import { TypeEntity } from "./type";

@Entity({ name: "pokemon" })
export class PokemonEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "name" })
  name: string;

  @ManyToMany(() => AbilityEntity, (ability) => ability.pokemons, {
    cascade: true,
  })
  @JoinTable({ name: "pokemon_ability" })
  abilities: AbilityEntity[];

  @OneToMany(() => SpriteEntity, (sprite) => sprite.pokemon, {
    cascade: true,
  })
  @JoinTable({ name: "pokemon_sprite" })
  sprites: SpriteEntity[];

  @ManyToMany(() => TypeEntity, (type) => type.pokemons, {
    cascade: true,
  })
  @JoinTable({ name: "pokemon_type" })
  types: TypeEntity[];
}
