import { of, Subject } from "rxjs";
import { map, concatAll, take } from "rxjs/operators";
import { httpClient } from "../http/http-client";
import { ballRenderer } from "../ui/ball-renderer";
import { catchPokemon } from "./catch-service";

const availableBalls: any = {};

export const getBalls = (balls: string[]) => {
  of(...balls)
    .pipe(
      map((ball) => httpClient.get(`https://pokeapi.co/api/v2/item/${ball}`)),
      concatAll(),
      take(balls.length)
    )
    .subscribe((item) => {
      ballRenderer.next(item);
      availableBalls[item.name] = item;
    });
};

export const ballUsedSubject = new Subject();

ballUsedSubject
  .pipe(map((ballName: string) => availableBalls[ballName]))
  .subscribe((ballUsed: any) => {
    if (ballUsed.name === "master-ball") {
      catchPokemon.next();
    } else {
      calculateCatch(ballUsed);
    }
  });

const calculateCatch = (ballUsed: any) => {
  const effect: string = ballUsed.effect_entries[0]?.effect;
  const ballEffect = effect.match(/\d+(\.\d+)?/)[0];
  const catchProbability = Math.random() * parseFloat(ballEffect);
  if (catchProbability > 1) {
    catchPokemon.next();
  }
};
