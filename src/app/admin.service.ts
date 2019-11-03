import { Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import {Config} from '@models/config';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public restUrl = 'http://localhost:8080'; // For testing

  constructor(private http: HttpClient) { }

  public getConfig(): Observable<Config> {
    return this.http.get<Config>(`${this.restUrl}/api/config`)
      .pipe(
        map(result => result),
        catchError((err) => {
          console.error(err);
          return observableOf(null);
        })
      );
  }

  public updateConfig(config: Config): Observable<void> {
    return this.http.post(`${this.restUrl}/api/config`, config)
      .pipe(
        catchError((err) => {
          console.error(err);
          return observableOf(null);
        })
      );
  }

  public submitUserResetImage(requestBody: any): Observable<void> {
    return this.http.post(`${this.restUrl}/api/admin/resetUserRegistration`, requestBody)
      .pipe(
        catchError((err) => {
          console.error(err);
          return observableOf(null);
        })
      );
  }

  public submitConfigChangeByKeyAndValue(requestBody: any): Observable<void> {
    return this.http.post(`${this.restUrl}/api/config/change`, requestBody)
      .pipe(
        catchError((err) => {
          console.error(err);
          return observableOf(null);
        })
      );
  }

}
