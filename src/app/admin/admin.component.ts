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

  constructor(public adminService: AdminService) {
    console.log('run this get', this.adminService.getConfig());
  }

  public config$: Observable<Config> = this.adminService.getConfig()
    .pipe(config => config);

  public submitChanges() {
    console.log({bloomerangBaseApiUrl: this.bloomerangBaseApiUrl});
    console.log({surveyCheckinOnlyUrl: this.surveyCheckinOnlyUrl});
    console.log({surveyCheckinAnd6MonthUrl: this.surveyCheckinAnd6MonthUrl});
  }

 ngOnInit() {
  }

}
