import { getBalls } from "./core/ball-service";
import { getNewPokemon, setUnallowedPokemons } from "./core/pokemon-service";

const balls = ["poke-ball", "great-ball", "ultra-ball", "master-ball"];
const unallowedPokemons: number[] = [];

export const startGame = () => {
  setUnallowedPokemons(unallowedPokemons);
  getBalls(balls);
  getNewPokemon();
};
