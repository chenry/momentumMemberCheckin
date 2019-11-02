import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '@home/home.component';
import { MemberCheckinComponent } from '@memberCheckin/member-checkin.component';
import { SurveySelectionComponent } from '@surveySelection/survey-selection.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'member-checkin',
    component: MemberCheckinComponent
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
