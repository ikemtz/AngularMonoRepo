import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IdType } from './id-type';

export class NrsrxBaseApiClientService<T extends { id?: IdType }> {
  public abstract url: string;
  constructor(protected readonly http: HttpClient) {}
  // Used to insert entities on NRSRx based API endpoints
  public post(payload: T): Observable<T> {
    return this.http.post<T>(payload.id ? `${this.url}?id=${payload.id}` : this.url, payload);
  }

  // Used to update entities on NRSRx based API endpoints
  public put(payload: T): Observable<T> {
    return this.http.put<T>(`${this.url}?id=${payload.id}`, payload);
  }

  public delete(payload: T): Observable<T> {
    return this.http.delete<T>(`${this.url}?id=${payload.id}`);
  }
}
