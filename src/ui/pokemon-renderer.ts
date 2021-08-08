import * as d3 from "d3";
import { Subject } from "rxjs";

export const pokemonRenderer = new Subject();

const renderer = d3.select("#renderer").append("div").attr("id", "pokemon");

pokemonRenderer.subscribe((pokemon: any) => {
  renderer
    .append("img")
    .attr("id", "pokemon-image")
    .attr("src", pokemon.sprites.front_default);
});

export const catchRenderer = new Subject();

catchRenderer.subscribe((pokemon: any) => {
  if (!!pokemon) {
    d3.select("#pokemon-image").remove();
    renderer
      .append("div")
      .attr("id", "pokemon-caught")
      .text(() => `${pokemon.name} caught!`);
  } else {
    d3.select("#pokemon-caught").remove();
  }
});
