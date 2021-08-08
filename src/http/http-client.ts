import { from, Observable } from "rxjs";
import { switchMap, take } from "rxjs/operators";

class HttpClient {
  get(url: string): Observable<any> {
    return from(fetch(url)).pipe(
      switchMap((response) => response.json()),
      take(1)
    );
  }
}

export const httpClient = new HttpClient();
