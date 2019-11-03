import { Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import {Config} from '@models/config';
import {environment} from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  public getConfig(): Observable<Config> {
    return this.http.get<Config>(`${environment.restUrl}/api/config`)
      .pipe(
        map(result => result),
        catchError((err) => {
          console.error(err);
          return observableOf(null);
        })
      );
  }

  public updateConfig(config: Config): Observable<void> {
    return this.http.post(`${environment.restUrl}/api/config`, config)
      .pipe(
        catchError((err) => {
          console.error(err);
          return observableOf(null);
        })
      );
  }

  public submitUserResetImage(requestBody: any): Observable<void> {
    return this.http.post(`${environment.restUrl}/api/admin/resetUserRegistration`, requestBody)
      .pipe(
        catchError((err) => {
          console.error(err);
          return observableOf(null);
        })
      );
  }

  public submitConfigChangeByKeyAndValue(requestBody: any): Observable<void> {
    return this.http.post(`${environment.restUrl}/api/config/change`, requestBody)
      .pipe(
        catchError((err) => {
          console.error(err);
          return observableOf(null);
        })
      );
  }

  public authenticateAdmin(requestBody: any): Observable<boolean> {
    console.log('Will call API');
    return this.http.post<boolean>(`${environment.restUrl}/api/admin/login`, requestBody)
      .pipe(
        map(result => result),
        catchError((err) => observableOf(false))
      );
  }
}
