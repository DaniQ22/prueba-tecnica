import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { UtilsService } from './utils.service';
import { shippingMaritime } from '../model/shippingMaritime';

@Injectable({
  providedIn: 'root'
})
export class MaritimeshippingService {

constructor(private httP: HttpClient,
  private serviceUtul: UtilsService) { }

getAll():Observable<any[]>{
  return this.httP.get<any[]>(this.serviceUtul.urlApi + 'maritime-shipping/all')
}

save(data: shippingMaritime):Observable<shippingMaritime>{
  return this.httP.post<shippingMaritime>(this.serviceUtul.urlApi + 'maritime-shipping/save', data, {responseType: 'text' as 'json'}).pipe(
    catchError(this.serviceUtul.HandleError)
  )
}
delete(guideNumber: string):Observable<any>{
  return this.httP.delete(this.serviceUtul.urlApi + 'maritime-shipping/delete/' + guideNumber, {responseType: 'text'  as 'json'}).pipe(
    catchError(this.serviceUtul.HandleError)
  )
}



}
