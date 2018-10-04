import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config'; // CONST...
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    public http: HttpClient
  ) { }}
 /*  newGame(game: Game): Observable<any> {
    const params = JSON.stringify(game);
    const headers = new HttpHeaders().set('Content-Type', 'application/json'); 
    const url = URL_SERVICIOS + '/game/setgame';
    console.log('GENERATING REQUEST...\n');
    return this.http.post(url, params, {headers: headers});
    // FALTA CREAR MODELO !!!!
  }
} */
