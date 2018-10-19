import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { GameService } from '../../services/service.index';
import { Game } from '../../models/game.model';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import {  AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  game: Game;
  idPlayer: string;
  idToPlay: string; // GUARDA EL ID DEL USUARIO QUE SE DESEA CONSULTAR EN LA BD
  constructor( public _gaming: GameService, private db: AngularFireDatabase, public router: Router) {

   }
  ngOnInit() {

    this.drawRectable();

  }
  exit() {
    this.router.navigate(['/']);
  }
  resetGame() {
    this._gaming.newGame(this.game).subscribe(
      result => {
        this.game.matrix = result.matrix;
        this.game.colorJ1 = result.colorJ1;
        this.game.colorJ2 = result.colorJ2;
        this.game.gameMode = result.gameMode;
        this.drawRectable();
      },
      error => {
        console.log(<any>error);
      }

    );
   }

  showMatrix(idToPlay) { // MUESTRA El JUEGO DE OTRO USUARIO
    // console.log ('Mostrando el juego del usuario: ' + idToPlay);
    if (this.db.database.ref('Juegos/' +  'Id').equalTo(idToPlay)) {
      this.db.database.ref('Juegos/' +  idToPlay + '/Matrix').on('value', function(snap) {
        console.log(snap.val());
        });
    } else {
      console.log ('Datos no encontrados');
    }
  }
  // -----------------------------------------------------------------------------------------------------
  // FUNCIÓN QUE PINTA CANVAS CUANDO SE PROCESA LA LÓGICA DESDE EL BACKEND
  // -----------------------------------------------------------------------------------------------------
  tryPlay(event) {
    // probar mover este segmento de codigo abajo para ver si puede mostrar secuencia de alerta diferente.
    const canvas: any = document.getElementById('stage');
    if (canvas.getContext) { // CHECKEA QUE EL CONTEXTO EXISTA
      const ctx = canvas.getContext('2d');
      const i = event.offsetX; // UBICA LA COORDENADA X
      const j = event.offsetY; // UBICA LA COORDENADA Y
      for (let x = 0; x <= this.game.size; x++) {
        for (let y = 0; y <= this.game.size; y++) {
          if ( (i >= x * 90 && i <= x * 90 + 90) && (j >= y * 90 && j <= y * 90 + 90) ) {
            this.game.coordX = x; // se setean las coordenadas (x, y) del click
            this.game.coordY = y;
            break;
          }
        }
      }
      this._gaming.playGame(this.game).subscribe(
        result => { // CARGA EL JSON CON LOS DATOS QUE RESPONDE EL BACK END
          this.game.matrix = result.matrix;
          this.game.coordX = result.coordX;
          this.game.coordY = result.coordY;
          this.game.jugada = result.jugada;
          this.game.win = result.win;
          this.game.turno = result.turno;
          this.game.colorJ1 = result.colorJ1;
          this.game.colorJ2 = result.colorJ2;
          this.game.coordXA = result.coordXA;
          this.game.coordYA = result.coordYA;

        // ------------------SE GUARDA LA INFORMACIÓN EN FIREBASE---------------------------------
          if (this.db.database.ref( 'Juegos/' + 'Id' ).equalTo(this.idPlayer )) {
            this.db.database.ref('Juegos/' + this.idPlayer + '/'  + 'Matrix').set(this.game.matrix);
            this.db.database.ref('Juegos/' + this.idPlayer + '/'  + 'Turno').set(this.game.turno);
            this.db.database.ref('Juegos/' + this.idPlayer + '/'  + 'CantidadGane').set(this.game.win);
            this.db.database.ref('Juegos/' + this.idPlayer + '/'  + 'Disponible').set('true');
          }
        this.idToPlay = 'jugador2';
        this.showMatrix('jugador2');
        // ----------------------------------------------------------------------------------------
          console.log('MATRIZ: ', this.game.matrix);
          if (this.game.win === true) {
            if (this.game.turno === 1) {
              ctx.fillStyle =  this.game.colorJ2; // 'rgb(160, 140, 160)'; // DEFINE EL COLOR DE LA FIGUTA
              ctx.fillRect(this.game.coordX * 90, this.game.coordY * 90, 90, 90);
              swal('¡Has ganado!', 'JUGADOR 1 GANA', 'success');
              // alert('JUGADOR 1 GANA');
            } else {
              ctx.fillStyle = this.game.colorJ1; // 'rgb(100, 100, 100)'; // DEFINE EL COLOR DE LA FIGUTA
              ctx.fillRect(this.game.coordX * 90, this.game.coordY * 90, 90, 90);
              swal('¡Has ganado!', 'JUGADOR 2 GANA', 'success');
            }
          } else {
            if (this.game.jugada === false) {
              swal('¡Oops!', 'Jugada inválida', 'warning');
            } else {
              if (this.game.turno === 2) {
                ctx.fillStyle = this.game.colorJ2; // DEFINE EL COLOR DE LA FIGUTA
                ctx.fillRect(this.game.coordX * 90, this.game.coordY * 90, 90, 90);
              } else {
                ctx.fillStyle = this.game.colorJ1; // DEFINE EL COLOR DE LA FIGUTA
                ctx.fillRect(this.game.coordX * 90, this.game.coordY * 90, 90, 90);
              }
            }
          } // JUG AUTOMÁTICO

        },
        error => {
          console.log(<any>error);
        }

      );
    }
  }
  // -----------------------------------------------------------------------------------------------------
  // FUNCIÓN QUE OBTIENE LA CONFIGURACIÓN DEL JUEGO DESDE EL BACKEND
  // -----------------------------------------------------------------------------------------------------
  drawRectable() {
    this._gaming.retrieveGame().subscribe(
      result => {
        this.game = new Game(
          result.matrix,
          result.size,
          result.toWin, 1, 1, 1, true, false, 0, 0,
          result.colorJ1,
          result.colorJ2,
          result.gameMode);
          console.log('MATRIX: ', this.game.matrix);
          console.log('GameMode: ', result.gameMode );
          const canvas: any = document.getElementById('stage');
          canvas.width = this.game.size * 90;  // VARIABLES QUE ACTUALIZAN LOS VALORES DEL CANVAS DE ACUERDO AL TAMAÑO DEL TABLERO
          canvas.height = this.game.size * 90;
              // se debe cambiar este ciclo x un ngFor y con una variable cargada desde el backend
          if (canvas.getContext) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height); // LIMPIA EL CANVAS
            for ( let i = 0; i <= this.game.size; i++) { // CICLO QUE SE ENCARGA DE INSERTAR CADA FICHA
              for (let j = 0; j <= this.game.size; j++) {
                  ctx.strokeRect(i * 90, j * 90, 90, 90); // ES UNA FICHA CON FORMATO: (x,y,width,height)
              }
            }
          }
          this.idPlayer = 'jugador1';
      },
      error => {
        console.log(<any>error);
      }
    );
   }


}
