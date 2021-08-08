import * as d3 from "d3";
import { fromEvent, Subject } from "rxjs";
import { ballUsedSubject } from "../core/ball-service";

export const ballRenderer = new Subject();

const renderer = d3.select("#renderer").append("div").attr("id", "balls");

ballRenderer.subscribe((item: any) => {
  renderer
    .append("img")
    .attr("src", item.sprites.default)
    .attr("id", item.name);
  createBallSubscription(item);
});

const createBallSubscription = (ball: any) => {
  const ballImg = document.getElementById(ball.name);
  fromEvent(ballImg, "click")
    .pipe()
    .subscribe(() => ballUsedSubject.next(ball.name));
};

export const showBallRenderer = new Subject<boolean>();

showBallRenderer.subscribe((value) => {
  if (value) {
    d3.select("#balls").style("visibility", "visible");
  } else {
    d3.select("#balls").style("visibility", "hidden");
  }
});
