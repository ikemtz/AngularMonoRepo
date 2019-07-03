import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export abstract class BaseWebApiService<Entity extends { id: any }> {

  abstract baseUrl: string;
  constructor(private readonly http: HttpClient) { }

  public put(entity: Entity): Observable<Entity> {
    return this.http.put<Entity>(this.baseUrl, entity);
  }

  public post(entity: Entity): Observable<Entity> {
    return this.http.post<Entity>(`${this.baseUrl}?id=${entity.id}`, entity);
  }

  public delete(id: string): Observable<Entity> {
    return this.http.delete<Entity>(`${this.baseUrl}?id=${id}`);
  }
}
