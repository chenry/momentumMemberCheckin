import { Component, OnInit } from '@angular/core';
import { ImageService } from '@services/image.service';
import { Observable } from 'rxjs';
import { Image } from '@models/image';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-member-checkin-pictures',
  templateUrl: './member-checkin-pictures.component.html',
  styleUrls: ['./member-checkin-pictures.component.scss']
})
export class MemberCheckinPicturesComponent implements OnInit {

  public images$: Observable<Image[]> = this.imageService.findImages();
  public subscriptions: any[] = [];
  constructor(public imageService: ImageService) { }

  ngOnInit() {
  }

  onImageClick(image: Image) {
    console.log({image});
    this.imageService.validateMemberImage(3399, image._id)
      .pipe(
        map(isValidated => {
          console.log({isValidated});
        })
      )
      .subscribe(x => console.log(x));
  }
}
