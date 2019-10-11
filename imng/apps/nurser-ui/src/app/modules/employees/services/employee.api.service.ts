import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { IEmployee } from '../../models/emp-odata'; 
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeApiService {

  readonly baseUrl = environment.emplMs.ApiEndpoint;
  constructor(private http: HttpClient) {}

  public put(payload: IEmployee): Observable<IEmployee> {
    return this.http.put(this.baseUrl, payload).pipe(map(t => <IEmployee>t));
  }

  public post(payload: IEmployee): Observable<IEmployee> {
    return this.http.post(`${this.baseUrl}?id=${payload.id}`, payload).pipe(map(t => <IEmployee>t));
  }

  public delete(id: string): Observable<IEmployee> {
    return this.http.delete(`${this.baseUrl}?id=${id}`).pipe(map(t => <IEmployee>t));
  }
}
