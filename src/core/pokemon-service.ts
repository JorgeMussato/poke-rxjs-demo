import { BehaviorSubject } from "rxjs";
import { httpClient } from "../http/http-client";
import { pokemonRenderer } from "../ui/pokemon-renderer";

const pokemonSubject = new BehaviorSubject(null);
export const currentPokemonObservable = pokemonSubject.asObservable();

const randomDexNumber = () => Math.round(Math.random() * 151);

export const getNewPokemon = () =>
  httpClient
    .get(`https://pokeapi.co/api/v2/pokemon/${randomDexNumber()}`)
    .subscribe((pokemon: any) => pokemonSubject.next(pokemon));

pokemonSubject.subscribe(
  (pokemon) => !!pokemon && pokemonRenderer.next(pokemon)
);
