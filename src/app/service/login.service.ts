import { Injectable } from '@angular/core';
import { UtilsService } from './utils.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private utilService: UtilsService,
    private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post(this.utilService.urlApi + 'auth/login', data, { observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        const body = response.body;

        // Verificar si el cuerpo de la respuesta contiene el nombre de usuario y las autoridades
        const username = body && body.username ? body.username : '';
        const authorities = body && body.authorities ? body.authorities : [];
        localStorage.setItem('username', username);
        localStorage.setItem('authorities', JSON.stringify(authorities)); // Convertir a cadena JSON

        // Extraer el token de autorización del encabezado de la respuesta
        const header = response.headers;
        const bearerToken = header.get('Authorization') || ''; // Usar || '' para evitar errores si no hay token
        const token = bearerToken.replace('Bearer ', '');

        // Almacenar el token en el almacenamiento local del navegador
        localStorage.setItem('token', token);

        //Retornamos el nombre de usuario y los authorities
        return { username, authorities };
      }),
      catchError(this.utilService.HandleError)
    );
  }

  getToken() {
    return localStorage.getItem('token');
  }
  getUsername() {
    return localStorage.getItem('username');
  }
  getAuthorities() {
    return localStorage.getItem('authorities');
  }

}
