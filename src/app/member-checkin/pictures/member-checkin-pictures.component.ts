import { Component, OnInit } from '@angular/core';
import {AppstateService} from '../../appstate.service';
import {AppState} from '@models/appstate';

@Component({
  selector: 'app-member-checkin-pictures',
  templateUrl: './member-checkin-pictures.component.html',
  styleUrls: ['./member-checkin-pictures.component.scss']
})
export class MemberCheckinPicturesComponent implements OnInit {
  appState: AppState;

  public tiles = [
    {img: "http://placekitten.com/200/300"},
    {img: "http://placekitten.com/200/300"},
    {img: "http://placekitten.com/200/300"},
    {img: "http://placekitten.com/200/500"},
    {img: "http://placekitten.com/500/300"},
    {img: "http://placekitten.com/200/300"},
    {img: "http://placekitten.com/200/300"},
    {img: "http://placekitten.com/300/200"},
    {img: "http://placekitten.com/200/300"}
    ];
  constructor(public appStateService: AppstateService) { }

  ngOnInit() {
    this.appStateService.appStateSubject.subscribe(x => this.appState = x);
    console.log(`AccountNumber: ${this.appState.accountNumber}`);
  }

}
