import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { AbilityEntity } from "./ability";
import { SpriteEntity } from "./sprite";
import { TypeEntity } from "./type";

@Entity()
export class PokemonEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "name" })
  name: string;

  @ManyToMany(() => AbilityEntity, (ability) => ability.pokemons)
  @JoinTable()
  abilities: AbilityEntity[];

  @ManyToOne(() => SpriteEntity, (sprite) => sprite.pokemon)
  @JoinTable()
  sprites: SpriteEntity[];

  @ManyToMany(() => TypeEntity, (type) => type.pokemons)
  @JoinTable()
  types: TypeEntity[];
}
