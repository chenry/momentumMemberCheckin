import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of as observableOf} from 'rxjs';
import {AppState} from '@models/appstate';
import {Config} from '@models/config';
import {environment} from '../environments/environment';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppstateService {

  appStateSubject: BehaviorSubject<AppState>;
  appState: AppState;

  constructor() {
    this.appState = new AppState();
    this.appState = {
      accountNumber: '-1'
    };
    this.appStateSubject = new BehaviorSubject<AppState>(this.appState);
  }

  public updateAccountNumber(accountNumber: string) {
    this.appState.accountNumber = accountNumber;
    this.appStateSubject.next(this.appState);
  }
}
