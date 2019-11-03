import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  memberAuthenticated = false;
  adminAuthenticated = false;

  constructor() { }

  isAdminAuthenticated(): boolean { 
    return this.adminAuthenticated;
  }

  setAdminAuthenticated(): void {
    this.adminAuthenticated = true;
  }

  isMemberAuthenticated(): boolean {
    return this.memberAuthenticated;
  }

  setMemberAuthenticated(): void {
    this.memberAuthenticated = true;
  }
}