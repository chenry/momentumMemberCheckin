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

  public isSomethingDue$: Observable<boolean> = this.memberService.isSomethingDue('3399')
    .pipe(isSomethingDue => isSomethingDue);

  public validateMemberImage$: Observable<boolean> = this.memberService.verifyMember('3399')
    .pipe(validateMemberImage => validateMemberImage);

  public memberHaveImage$: Observable<boolean> = this.memberService.memberHaveImage('3399')
    .pipe(memberHaveImage => memberHaveImage);

  public findImages$: Observable<boolean> = this.memberService.findImages('3399')
    .pipe(findImages => findImages);

  public isVerified$: Observable<boolean> = this.memberService.verifyMember('3399')
    .pipe(isVerified => isVerified);

  public findSurveyURLs: Observable<string> = this.memberService.findSurveyURLs('3399')
    .pipe(findSurveyURLs => findSurveyURLs);



  constructor(public memberService: MemberService) {
    console.log('run this get', this.memberService.getMember('3399'));

  }


  ngOnInit() {
  }

}
