import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-checkin-calculator',
  templateUrl: './member-checkin-calculator.component.html',
  styleUrls: ['./member-checkin-calculator.component.scss']
})
export class MemberCheckinCalculatorComponent implements OnInit {

  userId = '';
  numbers = [];
  constructor() {
  }

  ngOnInit() {
    for (let i = 0; i <= 8; i++) {
      this.numbers.push(i + 1);
    }
  }

  public getNumber(v: string) {
    console.log(v);
    if (this.userId.length < 4) {
      this.userId = this.userId + v;
    }
  }

  public deleteNumber() {
    // TODO
  }

  public submitNumber(userId: string) {
    // TODO Call memberService.isPersonValidMember (or whatever we called it)
    // this.router.navigateByUrl(['member-checkin', 'pictures']);
  }
}
