import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IdType } from './id-type';
import { normalizeRequest } from './normalize-request';
import { toDateOnly } from './to-date-only';

export abstract class NrsrxBaseApiClientService<
  TENTITY extends { id?: IdType | null },
> {
  /**
   * The URL of the API endpoint to call
   */
  public abstract url: string;

  /**
   * A collection of strings that represent date only property names
   */
  public dateOnlyPropertyNames: string[] = [];

  constructor(protected readonly http: HttpClient) {}

  /**
   * Calls the insert (POST) endpoint on a NRSRx based API endpoint
   * @param payload
   * @returns Observable<TENTITY>
   */
  public post(payload: TENTITY): Observable<TENTITY> {
    return this.http.post<TENTITY>(
      payload.id ? `${this.url}?id=${payload.id}` : this.url,
      this.formatEntity(payload),
    );
  }

  /**
   * Calls the update (PUT) endpoint on a NRSRx based API endpoint
   * @param payload
   * @returns Observable<TENTITY>
   */
  public put(payload: TENTITY): Observable<TENTITY> {
    return this.http.put<TENTITY>(
      `${this.url}?id=${payload.id}`,
      this.formatEntity(payload),
    );
  }

  /**
   * Calls the delete endpoint on a NRSRx based API endpoint
   * @param payload
   * @returns Observable<TENTITY>
   */
  public delete(payload: TENTITY): Observable<TENTITY> {
    return this.http.delete<TENTITY>(`${this.url}?id=${payload.id}`);
  }

  public formatEntity(entity: TENTITY): TENTITY {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anyEntity: any = normalizeRequest(entity); //NOSONAR
    this.dateOnlyPropertyNames.forEach(
      (propertyName) =>
        (anyEntity[propertyName] = toDateOnly(anyEntity[propertyName])),
    );
    return anyEntity;
  }
}
