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
  public member$: Observable<Member> = this.memberService.getMembers('3399').pipe(member => member);

  constructor(public memberService: MemberService) {
    console.log('run this get', this.memberService.getMembers('3399'));
  }

  ngOnInit() {
  }

}
