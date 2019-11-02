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

  public verifyMember(accountNumber: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.restUrl}/api/member/verify/${accountNumber}`)
    .pipe(
      map(result => result),
      catchError((err) => observableOf(false))
    );
  }
}
