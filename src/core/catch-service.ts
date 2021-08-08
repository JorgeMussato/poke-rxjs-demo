import { Subject } from "rxjs";
import { withLatestFrom, map, tap, delay } from "rxjs/operators";
import { showBallRenderer } from "../ui/ball-renderer";
import { catchRenderer } from "../ui/pokemon-renderer";
import { currentPokemonObservable, getNewPokemon } from "./pokemon-service";

export const catchPokemon = new Subject();

catchPokemon
  .pipe(
    withLatestFrom(currentPokemonObservable),
    map(([ignored, pokemon]) => pokemon),
    tap((pokemon) => catchRenderer.next(pokemon)),
    tap(() => showBallRenderer.next(false)),
    delay(2000),
    tap(() => showBallRenderer.next(true)),
    tap(() => catchRenderer.next())
  )
  .subscribe(() => getNewPokemon());
