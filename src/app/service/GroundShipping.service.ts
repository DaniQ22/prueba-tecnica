import { Injectable } from '@angular/core';
import { UtilsService } from './utils.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { shippingground } from '../model/shippingGround';

@Injectable({
  providedIn: 'root'
})
export class GroundShippingService {

constructor(private serviceUtil: UtilsService,
  private http: HttpClient) { }

  getAll():Observable<any[]> {
    return this.http.get<any[]>(this.serviceUtil.urlApi + 'ground-shipping/all').pipe(
      catchError(this.serviceUtil.HandleError)
    );
  }

  save(data: shippingground):Observable<shippingground>{
    return this.http.post<shippingground>(this.serviceUtil.urlApi  + 'ground-shipping/save', data , {responseType: 'text' as 'json'}).pipe(
      catchError(this.serviceUtil.HandleError)
    )
  }

  delete(guideNumber: string):Observable<any>{
    return this.http.delete<any>(this.serviceUtil.urlApi + 'ground-shipping/delete/' + guideNumber, {responseType: 'text' as 'json'}).pipe(
      catchError(this.serviceUtil.HandleError)
    )

  }

  update(data: shippingground):Observable<shippingground>{
    return this.http.post<shippingground>(this.serviceUtil.urlApi  + 'ground-shipping/save', data , {responseType: 'text' as 'json'}).pipe(
      catchError(this.serviceUtil.HandleError)
    )
  }
}
