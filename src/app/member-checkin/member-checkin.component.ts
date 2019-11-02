import { Component, OnInit } from '@angular/core';
import { MemberService } from '@services/member.service';
import { Observable } from 'rxjs';
import { Member } from '@models/member';

@Component({
  selector: 'app-member-checkin',
  templateUrl: './member-checkin.component.html',
  styleUrls: ['./member-checkin.component.scss']

})

export class MemberCheckinComponent implements OnInit {
  public member$: Observable<Member> = this.memberService.getMember('3399')
    .pipe(member => member);
  public isVerified$: Observable<boolean> = this.memberService.verifyMember('3399')
    .pipe(isVerified => isVerified);

  constructor(public memberService: MemberService) {
    console.log('run this get', this.memberService.getMember('3399'));
  }

  ngOnInit() {
  }

}
