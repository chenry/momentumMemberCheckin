import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MemberCheckinComponent } from './member-checkin/member-checkin.component';
import { SurveySelectionComponent } from '@surveySelection/survey-selection.component';
import { MemberCheckinPicturesComponent } from '@memberCheckin/pictures/member-checkin-pictures.component';
import { MemberCheckinCalculatorComponent } from '@memberCheckin/calculator/member-checkin-calculator.component';
import { MemberCheckinAdminLoginComponent } from '@memberCheckin/admin-login/admin-login.component';

import { MemberService } from '@services/member.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MemberCheckinComponent,
    SurveySelectionComponent,
    MemberCheckinCalculatorComponent,
    MemberCheckinPicturesComponent,
    MemberCheckinAdminLoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [MemberService],
  bootstrap: [AppComponent]
})
export class AppModule { }
