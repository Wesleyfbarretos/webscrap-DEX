import { AppDataSource } from "./data-source";
import axios, { AxiosResponse } from "axios";
import {
  AbilityEntity,
  PokemonEntity,
  SpriteEntity,
  TypeEntity,
} from "./entities";
import { type } from "os";
import { Any } from "typeorm";

interface ResultApi {
  name: string;
  id: number;
  type: string;
  abilities: Abilities[];
  url: string;
  sprites: Sprites;
  types: Types[];
}

interface Abilities {
  ability: {
    name: string;
  };
  is_hidden: boolean;
}

interface Sprites {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
}

interface Types {
  type: {
    name: string;
  };
}

interface ResultAll {
  pokemons: PokemonEntity;
  abilities: AbilityEntity[];
  types: TypeEntity[];
  sprites: SpriteEntity[];
}

AppDataSource.initialize()
  .then(async () => {
    const url = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=15&offset=0"
    );

    const min = 500;
    const max = 1000;

    const { results } = url.data;

    const startWebScrapping: ResultAll[] = await Promise.all(
      results.map(async (results: { url: string }) => {
        await new Promise((r) =>
          setTimeout(r, Math.random() * (max - min) + min)
        );
        console.log(results.url);
        const data = await axios.get(results.url);
        const result: ResultApi = data.data;

        const pokemon = new PokemonEntity();
        pokemon.name = result.name;
        pokemon.sprites = [];
        pokemon.abilities = result.abilities.map((abilities: Abilities) => {
          const ability = new AbilityEntity();
          ability.name = abilities.ability.name;

          ability.isHidden = abilities.is_hidden;
          return ability;
        });

        for (let [key, value] of Object.entries(result.sprites as Sprites)) {
          if (
            key == "front_default" ||
            key == "back_default" ||
            key == "back_shiny" ||
            key == "front_shiny"
          ) {
            const sprite = new SpriteEntity();
            sprite.name = key;
            sprite.img = value;
            pokemon.sprites.push(sprite);
          }
        }

        pokemon.types = result.types.map((types: Types) => {
          const type = new TypeEntity();
          type.name = types.type.name;
          return type;
        });

        return {
          pokemons: pokemon,
          abilities: pokemon.abilities,
          types: pokemon.types,
          sprites: pokemon.sprites,
        };
      })
    );

    for (const result of startWebScrapping) {
      const abilityAlreadyExist = await Promise.all(
        result.abilities.map(async (ability) => {
          const resultDb = await AppDataSource.getRepository(
            AbilityEntity
          ).findOneBy({
            name: ability.name,
          });
          if (resultDb === null) {
            return await AppDataSource.manager
              .getRepository(AbilityEntity)
              .save(ability);
          }
        })
      );
      const typeAlreadyExist = await Promise.all(
        result.types.map(async (type) => {
          const resultDb = await AppDataSource.getRepository(
            TypeEntity
          ).findOneBy({
            name: type.name,
          });
          if (resultDb === null) {
            return await AppDataSource.manager
              .getRepository(TypeEntity)
              .save(type);
          }
        })
      );

      result.pokemons.abilities = abilityAlreadyExist;

      result.pokemons.types = typeAlreadyExist;

      await AppDataSource.manager
        .getRepository(SpriteEntity)
        .save(result.sprites);

      await AppDataSource.manager
        .getRepository(PokemonEntity)
        .save(result.pokemons);
      console.log(`inserted in database pokemon: ${result.pokemons.name}`);
    }
  })
  .catch((error) => console.log(error));
