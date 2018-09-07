import { Injectable } from '@angular/core';
import { Game } from '../../models/game.model';
import { URL_SERVICIOS } from '../../config/config'; // CONST...
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(
    public http: HttpClient
  ) { }
  someFunction(game: Game): Observable<any> {
    const params = JSON.stringify(game);
    // console.log(params);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const url = URL_SERVICIOS + '/game/setgame';
    console.log('GENERATING REQUEST...\n');
    return this.http.post(url, params, {headers: headers}); // enviando game retornando observador para manejar response
    // conexión a servidor
    // alert('someFunction()');
  }
}
