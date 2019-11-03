import {Component, OnDestroy, OnInit} from '@angular/core';
import { SurveyService} from '../survey.service';
import { SurveyUrls} from '@models/surveyurls';
import {FormControl} from '@angular/forms';
import {AppstateService} from '../appstate.service';
import {AppState} from '@models/appstate';
import {AdminService} from '../admin.service';

@Component({
  selector: 'app-survey-selection',
  templateUrl: './survey-selection.component.html',
  styleUrls: ['./survey-selection.component.scss']
})
export class SurveySelectionComponent implements OnInit, OnDestroy {
  appState: AppState
  announcementMessage = ''
  isSixMonthDue: boolean;
  surveySixMonthEnabledUrl = new FormControl('');
  surveyCheckInOnlyUrl = new FormControl('');

  constructor(public surveyService: SurveyService, public appStateService: AppstateService, public adminService: AdminService) { }

  ngOnInit() {
    this.appStateService.appStateSubject.subscribe(x => this.appState = x);

    this.surveyService.findSurveyURLs(this.appState.accountNumber).pipe().subscribe(x => {
      this.surveySixMonthEnabledUrl.setValue(x.sixMonthEnabled);
      this.surveyCheckInOnlyUrl.setValue(x.checkInOnly);
    });

    this.surveyService.findWhatIsDue(this.appState.accountNumber).pipe().subscribe(x => {
      this.isSixMonthDue = x.sixMonthTask;
    });

    this.adminService.getConfig().pipe().subscribe(config => {
      this.announcementMessage = config.announcementMessage;
    });

  }

  ngOnDestroy(): void {
    this.appStateService.updateAccountNumber(-1);
  }
}
