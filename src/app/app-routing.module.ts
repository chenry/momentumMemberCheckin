import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '@home/home.component';
import { MemberCheckinComponent } from '@memberCheckin/member-checkin.component';
import { SurveySelectionComponent } from '@surveySelection/survey-selection.component';
import { MemberCheckinPicturesComponent } from '@memberCheckin/pictures/member-checkin-pictures.component';
import { MemberCheckinCalculatorComponent } from '@memberCheckin/calculator/member-checkin-calculator.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '',
    component: MemberCheckinComponent
  },
  {
    path: 'member-checkin/calculator',
    component: MemberCheckinCalculatorComponent
  },
  {
    path: 'member-checkin/pictures',
    component: MemberCheckinPicturesComponent
  },
  {
    path: 'survey-selection',
    component: SurveySelectionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
