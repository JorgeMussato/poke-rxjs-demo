import { BehaviorSubject } from "rxjs";
import { httpClient } from "../http/http-client";
import { pokemonRenderer } from "../ui/pokemon-renderer";

const pokemonSubject = new BehaviorSubject(null);
export const currentPokemonObservable = pokemonSubject.asObservable();

let unallowedPokemons: number[] = [];

export const setUnallowedPokemons = (unallowed: number[]) => {
  unallowedPokemons = unallowed;
};

const getRandomDexNumber = (): number => {
  const dexNumber = Math.round(Math.random() * 151);
  return unallowedPokemons.includes(dexNumber)
    ? getRandomDexNumber()
    : dexNumber;
};

const getPokemon = () =>
  httpClient.get(`https://pokeapi.co/api/v2/pokemon/${getRandomDexNumber()}`);

export const getNewPokemon = () =>
  getPokemon().subscribe((pokemon: any) => pokemonSubject.next(pokemon));

pokemonSubject.subscribe(
  (pokemon) => !!pokemon && pokemonRenderer.next(pokemon)
);
