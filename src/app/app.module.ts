import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { AdminLoginComponent } from '@admin/login/login.component';

import { MemberService } from '@services/member.service';
import { AdminComponent } from '@admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MemberCheckinComponent,
    SurveySelectionComponent,
    MemberCheckinCalculatorComponent,
    MemberCheckinPicturesComponent,
    AdminLoginComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [MemberService],
  bootstrap: [AppComponent]
})
export class AppModule { }
