import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of as observableOf} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {SurveyUrls} from '@models/surveyurls';
import {WhatIsDueResponse} from '@models/whatIsDueResponse';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private http: HttpClient) { }

  public findSurveyURLs(accountNumber: number): Observable<SurveyUrls> {
    return this.http.get<SurveyUrls>(`/api/surveyUrls?accountNumber=${accountNumber}`)
      .pipe(
        map(result => result),
        catchError((err) => {
          console.error(err);
          return observableOf(null);
        })
      );
  }

  public findWhatIsDue(accountNumber: number): Observable<WhatIsDueResponse> {
    return this.http.get<SurveyUrls>(`/api/member/${accountNumber}/timeline/tasks/open`)
      .pipe(
        map(result => result),
        catchError((err) => {
          console.error(err);
          return observableOf(null);
        })
      );
  }

}
