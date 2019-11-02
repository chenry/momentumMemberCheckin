import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '@home/home.component';
import { MemberCheckinComponent } from '@memberCheckin/member-checkin.component';
import { SurveySelectionComponent } from '@surveySelection/survey-selection.component';
import { MemberCheckinPicturesComponent } from '@memberCheckin/pictures/member-checkin-pictures.component';
import { MemberCheckinCalculatorComponent } from '@memberCheckin/calculator/member-checkin-calculator.component';
import { AdminLoginComponent } from '@admin/login/login.component';
import { AdminComponent } from './admin/admin/admin.component';

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
    path: 'member-checkin/calculator',
    component: MemberCheckinCalculatorComponent
  },
  {
    path: 'member-checkin/pictures',
    component: MemberCheckinPicturesComponent
  },
  {
    path: 'member-checkin/survey-selection',
    component: SurveySelectionComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'admin/login',
    component: AdminLoginComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
