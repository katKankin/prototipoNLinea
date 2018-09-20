import { Injectable } from '@angular/core';
import { Game } from '../../models/game.model';
import { URL_SERVICIOS } from '../../config/config'; // CONST...
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// SERVICIO QUE SE ENCARGA DE COMUNICARSE CON EL BACK END:
@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(
    public http: HttpClient
  ) { }
  // RECIBE VAR DE TIPO game (game.model) Y DEVUELVE UN OBSERVABLE
  newGame(game: Game): Observable<any> {
    const params = JSON.stringify(game); // ASIGNO LOS DATOS A UN JSON
    // console.log(params);
    const headers = new HttpHeaders().set('Content-Type', 'application/json'); // NO PREGUNTE DEJE ASÍ.. JAJA

    // VAR QUE REFERENCIA AL ENDPOINT Q SE NECESITA DEL BACK END
    // EN ESTE CASO LLAMARÁ AL ENDPOINT "http://localhost:3000/game/setgame"
    const url = URL_SERVICIOS + '/game/setgame';
    console.log('GENERATING REQUEST...\n');
    // ENVIO EL ENDPONT Y EL JSON, RETORNA UN "RESPONSE" CON LOS DATOS
    // PROCESADOS EN EL BACK END (VER BACK END)
    return this.http.post(url, params, {headers: headers}); // enviando game retornando observador para manejar response
    // conexión a servidor
    // alert('someFunction()');
  }
  playGame(game: Game): Observable<any> {
    const params = JSON.stringify(game); // ASIGNO LOS DATOS A UN JSON
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = URL_SERVICIOS + '/game/makePlay';
    console.log('GENERATING REQUEST...\n');
    return this.http.post(url, params, {headers: headers}); // enviando game retornando observador para manejar response

  }
}
