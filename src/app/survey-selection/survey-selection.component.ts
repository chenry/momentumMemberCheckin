import {Component, OnDestroy, OnInit} from '@angular/core';
import { SurveyService} from '../survey.service';
import { SurveyUrls} from '@models/surveyurls';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-survey-selection',
  templateUrl: './survey-selection.component.html',
  styleUrls: ['./survey-selection.component.scss']
})
export class SurveySelectionComponent implements OnInit, OnDestroy {
  surveySixMonthEnabledUrl = new FormControl('');
  surveyCheckInOnlyUrl = new FormControl('');

  constructor(public surveyService: SurveyService) { }

  ngOnInit() {
    this.surveyService.findSurveyURLs('3399').pipe().subscribe(x => {
      this.surveySixMonthEnabledUrl.setValue(x.sixMonthEnabled);
      this.surveyCheckInOnlyUrl.setValue(x.checkInOnly);
    });

  }

  ngOnDestroy(): void {
  }

  redirectToShortSurvey() {

  }

  redirectToSixMonthSurvey() {

  }
}
