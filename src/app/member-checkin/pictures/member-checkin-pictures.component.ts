import { Component, OnInit, OnDestroy } from '@angular/core';
import { ImageService } from '@services/image.service';
import { Observable } from 'rxjs';
import { Image } from '@models/image';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppstateService } from 'src/app/appstate.service';
import { AppState } from '@models/appstate';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-member-checkin-pictures',
  templateUrl: './member-checkin-pictures.component.html',
  styleUrls: ['./member-checkin-pictures.component.scss']
})
export class MemberCheckinPicturesComponent implements OnInit, OnDestroy {

  public images$: Observable<Image[]> = this.imageService.findImages();
  public subscriptions: any[] = [];
  public appState: AppState;
  constructor(
    public appStateService: AppstateService,
    public imageService: ImageService,
    public router: Router,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.appStateService.appStateSubject.subscribe(x => this.appState = x);
    console.log(`AccountNumber: ${this.appState.accountNumber}`);
  }

  onImageClick(image: Image) {
    console.log({image});
    this.subscriptions.push(this.imageService.validateMemberImage(this.appState.accountNumber, image._id)
      .pipe(
        map(isValidated => {
          console.log(`Is VAlidated: ${isValidated}`);
          if (isValidated) {
            this.auth.setMemberAuthenticated();
            this.router.navigateByUrl('member-checkin/survey-selection');
          } else {
            this.router.navigateByUrl('/');
          }
          return;
        })
      )
      .subscribe(x => console.log(x)));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
