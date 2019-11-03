import { Component, OnInit } from '@angular/core';
import { ImageService } from '@services/image.service';
import { Observable } from 'rxjs';
import { Image } from '@models/image';

@Component({
  selector: 'app-member-checkin-pictures',
  templateUrl: './member-checkin-pictures.component.html',
  styleUrls: ['./member-checkin-pictures.component.scss']
})
export class MemberCheckinPicturesComponent implements OnInit {
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

    public images$: Observable<Image[]> = this.imageService.findImages();
  constructor(public imageService: ImageService) { }

  ngOnInit() {
  }

}
