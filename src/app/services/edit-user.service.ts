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
export class EditUserService {

  private editUserUrl = 'http://localhost:5003/api/edituser';

  constructor(private http: HttpClient) { 

  }

  editUser(user: any):Observable<any>{
    return this.http.post<any>(this.editUserUrl, user, httpOptions).pipe(
      tap((user:any)=>{
          console.log("edit user")
      }),
      catchError(this.handleError<any>('editUser'))
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
