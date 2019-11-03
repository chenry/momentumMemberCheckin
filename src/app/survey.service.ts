import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of as observableOf} from 'rxjs';
import {environment} from '../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {SurveyUrls} from '@models/surveyurls';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private http: HttpClient) { }

  public findSurveyURLs(accountNumber: string): Observable<SurveyUrls> {
    return this.http.get<SurveyUrls>(`${environment.restUrl}/api/surveyUrls?accountNumber=${accountNumber}`)
      .pipe(
        map(result => result),
        catchError((err) => {
          console.error(err);
          return observableOf(null);
        })
      );
  }

}
