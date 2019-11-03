import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAdminAuthenticated(): boolean { 
    return false;
  }

  isMemberAuthenticated(): boolean {
    return false;
  }
}