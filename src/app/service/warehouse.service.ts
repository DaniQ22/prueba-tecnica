import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableInput } from 'rxjs';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(private http: HttpClient,
    private utilService: UtilsService) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.utilService.urlApi + 'warehouse/all')
  }

  getById(warehouseId: number): Observable<any> {
    return this.http.get<any>(this.utilService.urlApi + 'warehouse/getById/' + warehouseId)
  }

}
