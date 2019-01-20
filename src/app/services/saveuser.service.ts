import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {userDetail} from '../userlist/userdetail.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SaveuserService {

  private saveUserUrl = 'http://localhost:5003/api/saveuser';

  constructor(private http: HttpClient) { 

  }

  saveUser(user: any):Observable<any>{
    return this.http.post<any>(this.saveUserUrl, user, httpOptions).pipe(
      tap((user:any)=>{
          console.log("add user")
      }),
      catchError(this.handleError<any>('addUser'))
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
