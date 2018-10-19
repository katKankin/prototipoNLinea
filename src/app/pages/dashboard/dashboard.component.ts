import { Component, OnInit, Input} from '@angular/core';
import { GameService } from '../../services/service.index';
import { Game } from '../../models/game.model';
import swal from 'sweetalert';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  game: Game;
  constructor( public _gaming: GameService) {

   }
  ngOnInit() {
    // CADA VEZ QUE SE CREA UN NUEVO JUEGO SE CARGAN LOS DATOS DESDE EL BACKEND
    this.drawRectable();

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
          this.game.matrix = result.matrix; // SE LO ASIGNO A LA VAR TIPO game (game.model)
          this.game.coordX = result.coordX;
          this.game.coordY = result.coordY;
          this.game.jugada = result.jugada;
          this.game.win = result.win;
          this.game.turno = result.turno;
          this.game.colorJ1 = result.colorJ1;
          this.game.colorJ2 = result.colorJ2;
          
            console.log('MATRIZ: ', this.game.matrix);
            if (this.game.win === true) {
              if (this.game.turno === 1) {
                ctx.fillStyle =  this.game.colorJ2; // 'rgb(160, 140, 160)'; // DEFINE EL COLOR DE LA FIGUTA
                ctx.fillRect(this.game.coordX * 90, this.game.coordY * 90, 90, 90);
                swal('Has ganado!', 'JUGADOR 1 GANA', 'success');
                // alert('JUGADOR 1 GANA');
              } else {
                ctx.fillStyle = this.game.colorJ1; // 'rgb(100, 100, 100)'; // DEFINE EL COLOR DE LA FIGUTA
                ctx.fillRect(this.game.coordX * 90, this.game.coordY * 90, 90, 90);
                swal('Has ganado!', 'JUGADOR 2 GANA', 'success');
                // alert('JUGADOR 2 GANA');
              }
            } else {
              if (this.game.jugada === false) {
                swal('Oops!', 'Jugada inválida', 'warning');
                // alert('JUGADA INVALIDA');
              } else {
                if (this.game.turno === 2) {
                  /* console.log('ESTADO MATRIZ: ', this.game.matrix, '\nTURNO: ', this.game.turno,
                    '\nSE PUEDE JUGAR?: ', this.game.jugada); */
                  ctx.fillStyle = this.game.colorJ2; // DEFINE EL COLOR DE LA FIGUTA
                  ctx.fillRect(this.game.coordX * 90, this.game.coordY * 90, 90, 90);
                } else {
                  ctx.fillStyle = this.game.colorJ1; // DEFINE EL COLOR DE LA FIGUTA
                  ctx.fillRect(this.game.coordX * 90, this.game.coordY * 90, 90, 90);
                }
              }
            }
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
      },
      error => {
        console.log(<any>error);
      }
    );
   }


}
