import { Component, OnInit, OnDestroy } from '@angular/core';
import { ImageService } from '@services/image.service';
import { Observable } from 'rxjs';
import { Image } from '@models/image';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-checkin-pictures',
  templateUrl: './member-checkin-pictures.component.html',
  styleUrls: ['./member-checkin-pictures.component.scss']
})
export class MemberCheckinPicturesComponent implements OnInit, OnDestroy {

  public images$: Observable<Image[]> = this.imageService.findImages();
  public subscriptions: any[] = [];

  constructor(
    // public authService: AuthService,
    public imageService: ImageService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  onImageClick(image: Image) {
    console.log({image});
    // TODO
    // this.imageService.validateMemberImage(this.authService.getMemberId(), image._id)
    this.subscriptions.push(this.imageService.validateMemberImage(3399, image._id)
      .pipe(
        map(isValidated => {
          if (isValidated) {
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
