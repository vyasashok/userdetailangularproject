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
export class SavecityService {

  private saveCityUrl = 'http://localhost:5003/api/savecity';

  constructor(private http: HttpClient) { 

  }

  saveCity(city: any):Observable<any>{
    return this.http.post<any>(this.saveCityUrl, city, httpOptions).pipe(
      tap((city:any)=>{
          console.log("add city")
      }),
      catchError(this.handleError<any>('addCity'))
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
