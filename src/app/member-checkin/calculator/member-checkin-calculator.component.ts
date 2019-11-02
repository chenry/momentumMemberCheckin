import { Component, OnInit } from '@angular/core';
import { MemberService } from '@services/member.service';
import { Observable } from 'rxjs';
import { Member } from '@models/member';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-checkin-calculator',
  templateUrl: './member-checkin-calculator.component.html',
  styleUrls: ['./member-checkin-calculator.component.scss']
})
export class MemberCheckinCalculatorComponent implements OnInit {

  userId = '';
  numbers = [];
  
  constructor(public memberService: MemberService, public router: Router) {
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
    if (this.userId.length >= 1) {
      this.userId = this.userId.slice(0, -1);
    }
  }

  public submitNumber(userId: string) { 
    /** 
     * failing isn't working
     * we need to set it up to return to home if member doesn't exist */ 

    if (this.userId.length === 4) {
      this.memberService.verifyMember(this.userId)
        .pipe(isVerified => {
          console.log(isVerified);
          if (isVerified) {
            return this.router.navigateByUrl('member-checkin/pictures');
          } else {
            return this.router.navigateByUrl('/');
          }
        });
    }
    
  }
}
