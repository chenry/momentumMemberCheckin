import {Component, OnDestroy, OnInit} from '@angular/core';
import { SurveyService} from '../survey.service';
import { SurveyUrls} from '@models/surveyurls';
import {FormControl} from '@angular/forms';
import {AppstateService} from '../appstate.service';
import {AppState} from '@models/appstate';

@Component({
  selector: 'app-survey-selection',
  templateUrl: './survey-selection.component.html',
  styleUrls: ['./survey-selection.component.scss']
})
export class SurveySelectionComponent implements OnInit, OnDestroy {
  appState: AppState
  surveySixMonthEnabledUrl = new FormControl('');
  surveyCheckInOnlyUrl = new FormControl('');

  constructor(public surveyService: SurveyService, public appStateService: AppstateService) { }

  ngOnInit() {
    this.appStateService.appStateSubject.subscribe(x => this.appState = x);

    this.surveyService.findSurveyURLs(this.appState.accountNumber).pipe().subscribe(x => {
      this.surveySixMonthEnabledUrl.setValue(x.sixMonthEnabled);
      this.surveyCheckInOnlyUrl.setValue(x.checkInOnly);
    });

  }

  ngOnDestroy(): void {
    this.appStateService.updateAccountNumber('-1');
  }

  redirectToShortSurvey() {

  }

  redirectToSixMonthSurvey() {

  }
}
