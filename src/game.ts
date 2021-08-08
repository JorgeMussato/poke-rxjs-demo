import { getBalls } from "./core/ball-service";
import { getNewPokemon } from "./core/pokemon-service";

const balls = ["poke-ball", "great-ball", "ultra-ball", "master-ball"];

export const startGame = () => {
  getBalls(balls);
  getNewPokemon();
};
