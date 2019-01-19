import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const params = new HttpParams();

// const options = {
//     params,
//     reportProgress: true,
// };

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
};

@Injectable({
  providedIn: 'root'
})
export class UploadimageService {

  
  private uploadImageUrl = 'http://localhost:5003/api/upload';

  constructor(private http: HttpClient) { 

  }

  uploadImage(image: any):Observable<any>{

    const formData = new FormData();
    formData.append('image', image);
    formData.append('imageName', image.name);

    return this.http.post<any>(this.uploadImageUrl, formData).pipe(
      tap((image:any)=>{
          console.log("upload image")
      }),
      catchError(this.handleError<any>('uploadImage'))
    )

    
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
