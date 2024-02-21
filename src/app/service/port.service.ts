import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class PortService {

constructor(private http: HttpClient,
  private serviceUtil: UtilsService) { }


getAll():Observable<any[]>{
  return this.http.get<any[]>(this.serviceUtil.urlApi + 'port/all')
}
}
