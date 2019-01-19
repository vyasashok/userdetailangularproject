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
export class GetUesrsService {

  private getUsersUrl = 'http://localhost:5003/api/getusers';

  constructor(private http: HttpClient) { 

  }

  getUsers():Observable<any>{
    return this.http.get<any>(this.getUsersUrl).pipe(
      tap(()=>{
          console.log("get users data")
      }),
      catchError(this.handleError<any>('getUsersData'))
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
