import { Component, OnInit } from '@angular/core';
import {AdminService} from '../admin.service';
import {Observable} from 'rxjs';
import {Config} from '@models/config';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  bloomerangBaseApiUrl = new FormControl('');
  surveyCheckinOnlyUrl = new FormControl('');
  surveyCheckinAnd6MonthUrl = new FormControl('');
  announcements =  new FormControl('');
  config: Config;
  public resetUserImageAccountNumber = new FormControl('');

  constructor(public adminService: AdminService, formBuilder: FormBuilder) { }

  public config$: Observable<Config> = this.adminService.getConfig()
    .pipe(config => config);

  public submitUrlChanges() {

    let newConfig;
    newConfig = new Config();

    newConfig.bloomerangBaseApiUrl = this.bloomerangBaseApiUrl.value;
    newConfig.surveyCheckinOnlyUrl = this.surveyCheckinOnlyUrl.value;
    newConfig.surveyCheckinAnd6MonthUrl = this.surveyCheckinAnd6MonthUrl.value;

    this.adminService.updateConfig(newConfig).subscribe(
      x => x);
  }

  submitUserResetImage() {
    // submit the reset images (resetUserImageAccountNumber)

    const userResetImageRequest = {
      // tslint:disable-next-line:radix
      accountNumber: parseInt(this.resetUserImageAccountNumber.value)
    };


    this.adminService.submitUserResetImage(userResetImageRequest).subscribe(
      x => x);
  }

  submitAnnouncementChanges() {
    // submit the announcement changes (announcements)
  }


  ngOnInit() {
   this.adminService.getConfig().pipe().subscribe(x => {
     this.bloomerangBaseApiUrl.setValue(x.bloomerangBaseApiUrl);
     this.surveyCheckinOnlyUrl.setValue(x.surveyCheckinOnlyUrl);
     this.surveyCheckinAnd6MonthUrl.setValue(x.surveyCheckinAnd6MonthUrl);
   });
 }

}
