import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  memberAuthenticated = environment.defaultMemberAuthenticated;
  adminAuthenticated = environment.defaultMemberAuthenticated;

  constructor() { }

  isAdminAuthenticated(): boolean {
    return this.adminAuthenticated;
  }

  setAdminAuthenticated(): void {
    this.adminAuthenticated = true;
  }

  deauthenticate(): void {
    this.adminAuthenticated = false;
    this.memberAuthenticated = false;
  }

  isMemberAuthenticated(): boolean {
    return this.memberAuthenticated;
  }

  setMemberAuthenticated(): void {
    this.memberAuthenticated = true;
  }
}
