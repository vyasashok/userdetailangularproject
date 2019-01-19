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
export class SaveskillService {

  private saveSkillUrl = 'http://localhost:5003/api/saveskill';

  constructor(private http: HttpClient) { 

  }

  saveSkill(skill: any):Observable<any>{
    return this.http.post<any>(this.saveSkillUrl, skill, httpOptions).pipe(
      tap((skill:any)=>{
          console.log("add skill")
      }),
      catchError(this.handleError<any>('addSkill'))
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
