import { Observable } from "rxjs";

let observable = new Observable((observer: any) => {
  observer.next("hello world");
});

observable.subscribe((value: any) => console.log(value));
