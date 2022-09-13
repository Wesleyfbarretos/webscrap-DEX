import { AppDataSource } from "./data-source";
import axios, { AxiosResponse } from "axios";
import {
  AbilityEntity,
  PokemonEntity,
  SpriteEntity,
  TypeEntity,
} from "./entity";

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

AppDataSource.initialize()
  .then(async () => {
    console.log("Inserting a new pokemon into the database...");

    const url = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=4&offset=0"
    );

    const { results } = url.data;

    const startWebScrapping: PokemonEntity[] = await Promise.all(
      results.map(
        async (results: { url: string }) => {
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
              key == "back_default" ||
              key == "front_default" ||
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

          return pokemon;

          // axios.get(result.url).then((result: AxiosResponse<ResultApi>) => {
          //   const pokemon = new PokemonEntity();
          //   pokemon.name = result.data.name;
          //   pokemon.abilities = result.data.abilities.map(
          //     (abilities: Abilities) => {
          //       const ability = new AbilityEntity();
          //       ability.name = abilities.ability.name;

          //       console.log("Saved a new pokemon with id: " + pokemon.id);
          //       return ability;
          //     }
          //   );
          //   for (let [key, value] of Object.entries(result.data.sprites)) {
          //     const sprite = new SpriteEntity();
          //     sprite.name = key;
          //     sprite.img = value;
          //   }

          //     //     result.data.abilities.map((ability: Abilities) => {
          //     //       (ability.ability.name = ability.ability.name),
          //     //         (ability.isHidden = ability.isHidden);
          //     //     });
        } //)
      )
    );

    await AppDataSource.manager.save(startWebScrapping[0]);

    //console.log("Loading pokemons from the database...");
    // console.log("Loaded pokemons: ", pokemons);
  })
  .catch((error) => console.log(error));
