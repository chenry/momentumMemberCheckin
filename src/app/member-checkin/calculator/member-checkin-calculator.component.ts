import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-checkin-calculator',
  templateUrl: './member-checkin-calculator.component.html',
  styleUrls: ['./member-checkin-calculator.component.scss']
})
export class MemberCheckinCalculatorComponent implements OnInit {

  userId = '';

  constructor() { 
  }

  ngOnInit() {
    
  }

  public getNumber(v: string) {
    if (this.userId.length < 4) {
      this.userId = this.userId + v;
    }
  }
}
