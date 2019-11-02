import * as Server from 'server.js';
import { Injectable } from '@angular/core';
import { Member } from '@models/member';
import { Image } from '@models/image';
import { Observable, of as observableOf } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  public restUrl = 'http://localhost:8080'; // For testing

  constructor(private http: HttpClient) { }

  public getMember(accountNumber: string): Observable<Member> {
    return this.http.get<Member>(`${this.restUrl}/api/member/lookup/${accountNumber}`)
    .pipe(
      map(result => result),
      catchError((err) => {
        console.error(err);
        return observableOf(null);
      })
    );
  }

  public isSomethingDue(accountNumber: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.restUrl}/api/member/${accountNumber}/timeline/taks/open`)
    .pipe(
      map(result => result),
      catchError((err) => observableOf(false))
    );
  }
  public validateMemberImage(accountNumber: string): Observable<boolean> {
   return this.http.get<boolean>(`${this.restUrl}/api/member/login/${accountNumber}`)
   .pipe(
     map(result => result),
     catchError((err) => observableOf(false))
   );
 }
 public memberHaveImage(accountNumber: string): Observable<boolean>{
  return this.http.get<boolean>(`${this.restUrl}/api/member/registration-check/${accountNumber}`)
  .pipe(
    map(result => result),
    catchError((err) => observableOf(false))
  );
 }

 public findImages(accountNumber: string): Observable<boolean> {
   return this.http.get<boolean>(`${this.restUrl}/api/images`)
   .pipe(
     map(result => result),
     catchError((err) => observableOf(false))
   );
 }

  public verifyMember(accountNumber: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.restUrl}/api/member/verify/${accountNumber}`)
    .pipe(
      map(result => result),
      catchError((err) => observableOf(false))
    );
  }

  public findSurveyURLs(accountNumber: string):Observable<string> {
    return this.http.get<boolean>(`${this.restUrl}/api/surveyURLs?accountNumber=${accountNumber}`)
    pipe(
      map(result => result),
      catchError((err) => observableOf(false))
    );
  }
}
