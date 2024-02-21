import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor(private http: HttpClient,
  private utilServices: UtilsService) { }

signUp(user: any): Observable<any> {
  return this.http.post<any>(this.utilServices.urlApi + 'user/save', user, { responseType: 'text' as 'json' }).pipe(
    catchError(this.utilServices.HandleError)
  );
}

}
