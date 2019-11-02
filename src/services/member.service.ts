import * as Server from 'server.js';
import { Injectable } from '@angular/core';
import { Member } from '@models/member';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  constructor(private http: HttpClient) { }

  public getMembers(accountNumber: string): Observable<Member> {
    return this.http.get<Member>(`/api/member/lookup/${accountNumber}`);
  }
}
