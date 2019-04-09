import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PopUpService {
    private popupSource = new Subject<any>();

    popupSource$ = this.popupSource.asObservable();

    dataToSave(data: any) {
        this.popupSource.next(data);
    }
}
