import { Injectable } from '@angular/core';
import { Image } from '@models/image';
import { Observable, of as observableOf } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  public restUrl = 'http://localhost:8080'; // For testing
  constructor(private http: HttpClient) { }

  public validateMemberImage(accountNumber: number, imageId: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.restUrl}/api/member/login`, {
      accountNumber,
      imageId
    })
    .pipe(
      map(result => result),
      catchError((err) => observableOf(false))
    );
  }
  public memberHaveImage(accountNumber: string): Observable<boolean> {
   return this.http.get<boolean>(`${this.restUrl}/api/member/registration-check/${accountNumber}`)
   .pipe(
     map(result => result),
     catchError((err) => observableOf(false))
   );
  }

  public findImages(): Observable<Image[]> {
    return this.http.get<Image[]>(`${this.restUrl}/api/images`)
    .pipe(
      map(result => result),
      catchError((err) => {
        console.error(err);
        return observableOf(null);
      })
    );
  }
}
