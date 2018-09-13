import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ThrowStmt } from '../../../../node_modules/@angular/compiler';
import { GameService } from '../../services/service.index';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tam: number = 4; // se setea mínimo de 4 x 4

  cant: number = 2; // guarda la cantidad de fichas de gane
  manejoFichas: number = 1; // para el cambio de color de fichas
  turno: number = 1 ; // 1:J1 - 2:J2
  matrix: number[][] = new Array(); // matriz lógica (backend)
  fichasJ1: number = 0;
  fichasJ2: number = 0;
  // VER MODELO models.game
  game: Game; // VARIABLE DE TIPO MODELO JUEGO (AQUÍ SE CARGAN LOS DATOS DEL JSON)

  // SE INYECTA SERVICE AL COMPONENTE: (VER SERVICES game.service.ts)
  constructor( public _gaming: GameService) { }
  ngOnInit() {

    this.game = new Game([], 0); // ignore esto

  }

   // FUNCION PARA REPLICAR EL JUEGO EN UNA MATRIZ
   crearMatriz() {
    for (let a = 0; a < this.tam; a++) {
      const array = new Array;
      for (let s = 0; s < this.tam; s++) {
        array[s] = 0; // CREA UN ARRAY PARA CADA FILA
      }
      this.matrix[a] = array; // UNE CADA ARRAY,FORMA MATRIZ
    }
  }

  // -----------------------------------------------------------------------------------------------------
  // FUNCIÓN QUE PINTA UN CUADRO CUANDO LEE UN CLICK EN EL CANVAS
  // -----------------------------------------------------------------------------------------------------
  drawSomething(event) {
    const canvas: any = document.getElementById('stage');
    if (canvas.getContext) { // CHECKEA QUE EL CONTEXTO EXISTA
      const ctx = canvas.getContext('2d');
      const i = event.offsetX; // UBICA LA COORDENADA X
      const j = event.offsetY; // UBICA LA COORDENADA Y
      const xAnt = 0;
    //  alert('POS X: ' + (i) + 'POS Y: ' + (j) );
   //   ctx.fillRect(1 * 90, 2 * 90, 90, 90); // pinta pos 1, x= 1*90, y=2 * 90
   /*    if ( (i >= 1 * 90 && i <= 1 * 90 + 90) && (j >= 2 * 90 && j <= 2 * 90 + 90) ) {
        ctx.fillStyle = 'rgb(160, 140, 160)'; // DEFINE EL COLOR DE LA FIGUTA
        ctx.fillRect(1 * 90, 2 * 90, 90, 90); // DEFINE LA POSICIÒN A PINTAR´
      } */
      for (let x = 0; x <= this.tam; x++) {// voy a suponer que el tablero es de tam 4
        for (let y = 0; y <= this.tam; y++) {
          if ( (i >= x * 90 && i <= x * 90 + 90) && (j >= y * 90 && j <= y * 90 + 90) ) {
            if (this.matrix[y][x] === 0) { // VERIFICA QUE LA CASILLA NO TIENE FICHA
              if (this.turno === 1) {// FICHA JUGADOR 1
                if ((y + 1 === this.tam) && (this.matrix[y][x] === 0)) { // VERIFICA PARA COLOCAR LA FICHA EN LA ULTIMA FILA J1
                  this.matrix[y][x] = 1; // COLOCA FICHA 1
                  ctx.fillStyle = 'rgb(160, 140, 160)'; // DEFINE EL COLOR DE LA FIGUTA
                  ctx.fillRect(x * 90, y * 90, 90, 90);
                  this.turno = 2; // CAMBIO DE TURNO
                  this.verificarGaneHorizontal();
                  this.verificarGaneVertical();
                } else if (this.matrix[y + 1][x] !== 0) { // JUGAR SOBRE UNA FICHA
                  this.matrix[y][x] = 1; // FICHA JUGADOR 1
                  ctx.fillStyle = 'rgb(160, 140, 160)';
                  ctx.fillRect(x * 90, y * 90, 90, 90);
                  this.turno = 2; // CAMBIO DE TURNO
                  this.verificarGaneHorizontal();
                  this.verificarGaneVertical();
                } else {
                  alert( 'Jugada invalida, debe de tener una ficha abajo');
                }
              } else if (this.turno === 2) { // JUGADOR 2
                if ((y + 1 === this.tam) && (this.matrix[y][x] === 0)) { // VERIFICA PARA COLOCAR LA FICHA EN LA ULTIMA FILA J2
                  this.matrix[y][x] = 2; // FICHA JUGADOR 2
                  ctx.fillStyle = 'rgb(190, 100, 80)'; // DEFINE EL COLOR DE LA FIGUTA
                  ctx.fillRect(x * 90, y * 90, 90, 90);
                  this.turno = 1; // CAMBIO DE TURNO
                  this.verificarGaneHorizontal();
                  this.verificarGaneVertical();
                } else if (this.matrix[y + 1][x] !== 0) { // JUGAR SOBRE UNA FICHA
                  this.matrix[y][x] = 2; // FICHA JUGADOR 2
                  ctx.fillStyle = 'rgb(190, 100, 80)';
                  ctx.fillRect(x * 90, y * 90, 90, 90);
                  this.turno = 1; // CAMBIO DE TURNO
                  this.verificarGaneHorizontal();
                  this.verificarGaneVertical();
                } else {
                  alert('Jugada invalida, debe de tener una ficha abajo');
                }
              }
            } else {
              alert('Jugada invalida');
            }
            /*if ( this.manejoFichas % 2 === 0) {
              ctx.fillStyle = 'rgb(160, 140, 160)'; // DEFINE EL COLOR DE LA FIGUTA
              ctx.fillRect(x * 90, y * 90, 90, 90); // DEFINE LA POSICIÒN A PINTAR´
              this.manejoFichas = this.manejoFichas + 1;
            } else {
              ctx.fillStyle = 'rgb(190, 100, 80)'; // DEFINE EL COLOR DE LA FIGUTA
              ctx.fillRect(x * 90, y * 90, 90, 90); // DEFINE LA POSICIÒN A PINTAR´
              this.manejoFichas = this.manejoFichas + 1;
            }*/
          }
        }
      }
    }
  }
  // -----------------------------------------------------------------------------------------------------
  // FUNCIÓN QUE SE ENCARGA DE CREAR EL TABLERO DE JUEGO
  // -----------------------------------------------------------------------------------------------------
  drawRectable( tamano: number) { // RECIBE EL TAMAÑO DEL TABLERO: N X N //debería recibir el obj juego
    const canvas: any = document.getElementById('stage');
    canvas.width = tamano * 90;  // VARIABLES QUE ACTUALIZAN LOS VALORES DEL CANVAS DE ACUERDO AL TAMAÑO DEL TABLERO
    canvas.height = tamano * 90;
    console.log(tamano);
    this.crearMatriz(); // llenando matriz lógica esto lo debe hacer el backend
    // se debe cambiar este ciclo x un ngFor y con una variable cargada desde el backend
    if (canvas.getContext) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height); // LIMPIA EL CANVAS
      for ( let i = 0; i <= tamano; i++) { // CICLO QUE SE ENCARGA DE INSERTAR CADA FICHA
        for (let j = 0; j <= tamano; j++) {
            ctx.strokeRect(i * 90, j * 90, 90, 90); // ES UNA FICHA CON FORMATO: (x,y,width,height)
        }
      }
    }
    this.tam = tamano;
    this.game.size = this.tam; // posible redundancia
    console.log(this.game.size);

    // SERVICIO QUE SE INYECTA EN EL COMP DASHBOARD
    // ESTE SE ENCARGA DE LLAMAR AL BACK END
    // RECIBE EL PARÁMETRO game QUE ES DE TIPO game (game.model)
    this._gaming.someFunction(this.game).subscribe(
      result => { // CARGA EL JSON CON LOS DATOS QUE RESPONDE EL BACK END
        this.game.matrix = result.matrix; // SE LO ASIGNO A LA VAR TIPO game (game.model)
        // this.drawRectable(this.game.size); // AQUÍ SE DEBE CREAR LA MATRIZ CON ESTE PARAMETRO FALTA IMPLEMENTACION
        console.log(result);
      },
      error => {
        console.log(<any>error);
      }

    );
  }

  winCondition(cantidad: number) {
    this.cant = cantidad;
   console.log('Cantidad fichas de gane: ', cantidad);
  }

  verificarGaneHorizontal() {
    // console.log(this.matrix)
    for ( let i = 0; i < this.tam; i++) {
      for ( let e = 0; e < this.tam; e++) {
        if (( this.matrix[i][e] === 1) && (this.matrix[i][e + 1] === 1)) { // VERIFICA GANE JUGADOR 1 SOLO PARA 2 FICHAS JUNTAS
          this.fichasJ1++;
          this.matrix[i][e] = 3; // CAMBIA DE 1 A 3 PARA CONTAR LAS FICHAS SOLO 1 VEZ
          // console.log("fichasJ1: ", this.fichasJ1)
          if (this.fichasJ1 + 1 >= this.cant) { // MAYOR O IGUAL PORQUE EL GANE SE PUEDE FORMAR CON UNA FICHA MAS
            alert('Jugador 1 ha ganado');
          }
        } else if (( this.matrix[i][e] === 2) && (this.matrix[i][e + 1] === 2)) { // VERIFICA GANE JUGADOR 2 SOLO PARA 2 FICHAS JUNTAS
          this.fichasJ2++;
          this.matrix[i][e] = 4; // CAMBIA DE 2 A 4 PARA CONTAR LAS FICHAS SOLO 1 VEZ
          // console.log("fichasJ2: ", this.fichasJ2)
          if (this.fichasJ2 + 1 >= this.cant) { // MAYOR O IGUAL PORQUE EL GANE SE PUEDE FORMAR CON UNA FICHA MAS
            alert('Jugador 2 ha ganado');
          }
        }
      }
    }
  }

  // VERIFICA EL GANE EN VERTICAL PERO TIENE LA CANTIDAD DE FICHAS PARA EL GANE FIJO
  verificarGaneVertical() {
    // console.log(this.matrix)
    for (let i = 0; i < this.tam; i++) {
      for (let e = 0; e < this.tam; e++) {
        if ((this.matrix[i][e] === 1) && (this.matrix[i - 1][e] === 1)) { // VERIFICA GANE JUGADOR 1 SOLO PARA 2 FICHAS JUNTAS
          this.fichasJ1++;
          this.matrix[i][e] = 3; // CAMBIA DE 1 A 3 PARA CONTAR LAS FICHAS SOLO 1 VEZ
          // console.log("fichasJ1: ", this.fichasJ1)
          if (this.fichasJ1 + 1 >= this.cant) { // MAYOR O IGUAL PORQUE EL GANE SE PUEDE FORMAR CON UNA FICHA MAS
            alert('Jugador 1 ha ganado');
          }
        } else if (( this.matrix[i][e] === 2) && (this.matrix[i - 1][e] === 2)) { // VERIFICA GANE JUGADOR 2 SOLO PARA 2 FICHAS JUNTAS
          this.fichasJ2++;
          this.matrix[i][e] = 4; // CAMBIA DE 2 A 4 PARA CONTAR LAS FICHAS SOLO 1 VEZ
          // console.log("fichasJ2: ", this.fichasJ2)
          if (this.fichasJ2 + 1 >= this.cant) { // MAYOR O IGUAL PORQUE EL GANE SE PUEDE FORMAR CON UNA FICHA MAS
            alert('Jugador 2 ha ganado');
          }
        }
      }
    }
  }
}
