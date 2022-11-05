import { Injectable } from '@angular/core';
import { Image } from '@models/image';
import { Observable, of as observableOf } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private http: HttpClient) { }

  public validateMemberImage(accountNumber: number, imageId: string): Observable<boolean> {
    return this.http.post<boolean>('/api/member/login', {
      accountNumber,
      imageId
    })
    .pipe(
      map(result => result),
      catchError((err) => observableOf(false))
    );
  }
  public memberHaveImage(accountNumber: number): Observable<boolean> {
   return this.http.get<boolean>(`/api/member/registration-check/${accountNumber}`)
   .pipe(
     map(result => result),
     catchError((err) => observableOf(false))
   );
  }

  public findImages(): Observable<Image[]> {
    return this.http.get<Image[]>('/api/images')
    .pipe(
      map(result => result),
      catchError((err) => {
        console.error(err);
        return observableOf(null);
      })
    );
  }

  public updateImage(updateImageReq: any): Observable<void> {
    return this.http.post('/api/images', updateImageReq)
      .pipe(
        catchError((err) => {
          console.error(err);
          return observableOf(null);
        })
      );
  }

}
