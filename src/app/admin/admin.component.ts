import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public surveyUrl1 = new FormControl('');
  public surveyUrl2 = new FormControl('');
  public resetUserImage = new FormControl('');
  announcements: FormGroup;

  constructor(formBuilder: FormBuilder) {
  }

  ngOnInit() {
  }

}
