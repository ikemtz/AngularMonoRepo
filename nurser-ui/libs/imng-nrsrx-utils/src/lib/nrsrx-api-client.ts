
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class NrsrxBaseApiClientService<T extends { id?: string }> {
  public abstract url: string;
  constructor(protected readonly http: HttpClient) { }

  public put(payload: T): Observable<T> {
    return this.http.put<T>(this.url, payload);
  }

  public post(payload: T): Observable<T> {
    return this.http.post<T>(`${this.url}?id=${payload.id}`, payload);
  }

  public delete(id: string): Observable<T> {
    return this.http.delete<T>(`${this.url}?id=${id}`);
  }
}
