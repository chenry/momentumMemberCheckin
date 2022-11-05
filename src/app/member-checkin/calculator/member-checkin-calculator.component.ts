import { Component, OnInit, OnDestroy } from '@angular/core';
import { MemberService } from '@services/member.service';
import { Observable } from 'rxjs';
import { AppstateService} from '../../appstate.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-member-checkin-calculator',
  templateUrl: './member-checkin-calculator.component.html',
  styleUrls: ['./member-checkin-calculator.component.scss']
})
export class MemberCheckinCalculatorComponent implements OnInit, OnDestroy {

  userId = '';
  numbers = [];
  userIdLength: number = 6;
  isVerified$: Observable<boolean> =  this.memberService.verifyMember(this.userId).pipe(
    isVerified => isVerified
  );
  subscriptions = [];

  constructor(public memberService: MemberService, public router: Router, public appStateService: AppstateService) {
  }

  ngOnInit() {
    for (let i = 0; i <= 8; i++) {
      this.numbers.push(i + 1);
    }
  }

  public getNumber(v: string) {
    if (this.userId.length < this.userIdLength) {
      this.userId = this.userId + v;
    }
  }

  public deleteNumber() {
    if (this.userId.length >= 1) {
      this.userId = this.userId.slice(0, -1);
    }
  }

  public submitNumber() {
    if (this.userId.length <= this.userIdLength) {
      this.subscriptions.push(this.memberService.verifyMember(this.userId)
        .pipe(
          map(isVerified => {
            if (isVerified) {
              this.appStateService.updateAccountNumber(+this.userId);
              this.router.navigateByUrl('member-checkin/pictures');
            } else {
              this.router.navigateByUrl('/');
            }
            return;
          })
        ).subscribe(x => x));
    }
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
