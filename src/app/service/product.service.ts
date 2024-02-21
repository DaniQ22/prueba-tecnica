import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { UtilsService } from './utils.service';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

constructor(private http: HttpClient, private utilService: UtilsService) { }

save(product:any):Observable<any>{
  return this.http.post<any>(this.utilService.urlApi + 'product/save', product).pipe(
    catchError(this.utilService.HandleError)
  )
}

getALL():Observable<any[]>{
  return this.http.get<any[]>(this.utilService.urlApi + 'product/all').pipe(
    catchError(this.utilService.HandleError)
  );
}
}
