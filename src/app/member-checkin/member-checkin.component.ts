import { Component, OnInit } from '@angular/core';
import { MemberService } from '@services/member.service';
import { Observable } from 'rxjs';
import { Member } from '@models/member';
import { ImageService } from '@services/image.service';
import { Image } from '@models/image';

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

  public memberHaveImage$: Observable<boolean> = this.imageService.memberHaveImage('3399')
    .pipe(memberHaveImage => memberHaveImage);

  public findImages$: Observable<Image[]> = this.imageService.findImages()
    .pipe(findImages => findImages);

  public isVerified$: Observable<boolean> = this.memberService.verifyMember('3399')
    .pipe(isVerified => isVerified);

  public findSurveyURLs$: Observable<string> = this.memberService.findSurveyURLs('3399')
    .pipe(findSurveyURLs => findSurveyURLs);



  constructor(public memberService: MemberService, public imageService: ImageService) {
    console.log('run this get', this.memberService.getMember('3399'));

  }


  ngOnInit() {
  }

}
