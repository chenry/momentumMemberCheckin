import { Injectable } from '@angular/core';
import { Member } from '@models/member';
import { Observable, of as observableOf } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MemberService {

  constructor(private http: HttpClient) { }

  public getMember(accountNumber: string): Observable<Member> {
    return this.http.get<Member>(`/api/member/lookup/${accountNumber}`)
    .pipe(
      map(result => result),
      catchError((err) => {
        console.error(err);
        return observableOf(null);
      })
    );
  }

  public isSomethingDue(accountNumber: string): Observable<boolean> {
    return this.http.get<boolean>(`/api/member/${accountNumber}/timeline/taks/open`)
    .pipe(
      map(result => result),
      catchError((err) => observableOf(false))
    );
  }

  public verifyMember(accountNumber: string): Observable<boolean> {
    return this.http.get<boolean>(`/api/member/verify/${accountNumber}`)
    .pipe(
      map(result => result),
      catchError((err) => observableOf(false))
    );
  }

}
