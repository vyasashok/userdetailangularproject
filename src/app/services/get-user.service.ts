import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GetUserService {

  private getUserUrl = 'http://localhost:5003/api/getuser';

  constructor(private http: HttpClient) { 

  }

  getUser(userId: any):Observable<any>{
    return this.http.post<any>(this.getUserUrl, userId, httpOptions).pipe(
      tap((userId:any)=>{
          console.log("get user")
      }),
      catchError(this.handleError<any>('getUser'))
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
