import { Component, OnInit } from '@angular/core';
import {AdminService} from '../admin.service';
import { ImageService } from '@services/image.service';
import {Observable} from 'rxjs';
import {Config} from '@models/config';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Image } from '@models/image';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  bloomerangBaseApiUrl = new FormControl('');
  surveyCheckinOnlyUrl = new FormControl('');
  surveyCheckinAnd6MonthUrl = new FormControl('');
  announcementMessage =  new FormControl('');
  formControls: FormControl[] = [
    new FormControl(),
    new FormControl(),
    new FormControl(),
    new FormControl(),
    new FormControl(),
    new FormControl(),
    new FormControl(),
    new FormControl(),
    new FormControl()
  ];

  imageList = [];
  imageUrl = new FormControl('');
  config: Config;
  public resetUserImageAccountNumber = new FormControl('');

  constructor(public adminService: AdminService,
              formBuilder: FormBuilder,
              public imageService: ImageService) { }

  public config$: Observable<Config> = this.adminService.getConfig()
    .pipe(config => config);

  public submitUrlChanges() {

    let newConfig;
    newConfig = new Config();

    newConfig.bloomerangBaseApiUrl = this.bloomerangBaseApiUrl.value;
    newConfig.surveyCheckinOnlyUrl = this.surveyCheckinOnlyUrl.value;
    newConfig.surveyCheckinAnd6MonthUrl = this.surveyCheckinAnd6MonthUrl.value;

    this.adminService.updateConfig(newConfig).subscribe(
      x => x);
  }

  submitUserResetImage() {
    // submit the reset images (resetUserImageAccountNumber)

    const userResetImageRequest = {
      // tslint:disable-next-line:radix
      accountNumber: parseInt(this.resetUserImageAccountNumber.value)
    };


    this.adminService.submitUserResetImage(userResetImageRequest).subscribe(
      x => x);
  }

  updateImageUrls() {
    console.log(`update image urls`);
  }

  submitAnnouncementChanges() {
    // submit the announcement changes (announcements)
    const configChangeByKeyAndValueReq = {
      // tslint:disable-next-line:radix
      key: 'announcementMessage',
      value: this.announcementMessage.value
    };

    this.adminService.submitConfigChangeByKeyAndValue(configChangeByKeyAndValueReq).subscribe(
      x => x);
  }

  ngOnInit() {
   this.adminService.getConfig().pipe().subscribe(x => {
     this.bloomerangBaseApiUrl.setValue(x.bloomerangBaseApiUrl);
     this.surveyCheckinOnlyUrl.setValue(x.surveyCheckinOnlyUrl);
     this.surveyCheckinAnd6MonthUrl.setValue(x.surveyCheckinAnd6MonthUrl);
     this.announcementMessage.setValue(x.announcementMessage);
   });


   this.imageService.findImages()
      .pipe(
        map(images => {
          for (let i = 0; i < images.length; i++) {
            this.formControls[i].setValue(images[i].url);
          }
          this.imageList = images;
        })
      ).subscribe(x => x);
 }

 updateImage(index: number) {

    const selectedImage = this.imageList[index];
    const selectedControl = this.formControls[index];

    const updateImageReq = {
      imageId: selectedImage._id,
      imageUrl: selectedControl.value
    }

    console.log({updateImageReq})
    this.imageService.updateImage(updateImageReq).subscribe(x => x);
 }

}
