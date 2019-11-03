import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class AdminLoginComponent implements OnInit {
  options: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.options = formBuilder.group({
      secretCode: ['', Validators.minLength(1)]
    });
  }

  ngOnInit() {

  }

}
