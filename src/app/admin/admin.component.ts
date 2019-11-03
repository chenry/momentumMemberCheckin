import { Component, OnInit } from '@angular/core';
import {AdminService} from '../admin.service';
import {Observable} from 'rxjs';
import {Config} from '@models/config';
import {MatFormFieldControl} from '@angular/material';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  bloomerangBaseApiUrl = new FormControl('');
  surveyCheckinOnlyUrl = new FormControl('');
  surveyCheckinAnd6MonthUrl = new FormControl('');
  config: Config;

  constructor(public adminService: AdminService) { }

  public config$: Observable<Config> = this.adminService.getConfig()
    .pipe(config => config);

  public submitChanges() {

    let newConfig;
    newConfig = new Config();

    newConfig.bloomerangBaseApiUrl = this.bloomerangBaseApiUrl.value;
    newConfig.surveyCheckinOnlyUrl = this.surveyCheckinOnlyUrl.value;
    newConfig.surveyCheckinAnd6MonthUrl = this.surveyCheckinAnd6MonthUrl.value;

    this.adminService.updateConfig(newConfig).subscribe(
      x => console.log({x}));

  }

 ngOnInit() {
   this.adminService.getConfig().pipe().subscribe(x => {
     this.bloomerangBaseApiUrl.setValue(x.bloomerangBaseApiUrl);
     this.surveyCheckinOnlyUrl.setValue(x.surveyCheckinOnlyUrl);
     this.surveyCheckinAnd6MonthUrl.setValue(x.surveyCheckinAnd6MonthUrl);
   });
 }

}
