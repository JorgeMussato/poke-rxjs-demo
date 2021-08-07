import {Observable} from 'rxjs';

let observable = Observable.create((observer: any) => {
    observer.next('hello world');
});

observable.subscribe((value: any) => console.log(value));
