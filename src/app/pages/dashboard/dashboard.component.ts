import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tam: number = 4;
  cant: number = 2; // guarda la cantidad de fichas de gane
  manejoFichas: number = 1; // para el cambio de color de fichas
  turno : number = 1 ;//1:J1 - 2:J2
  matrix:number[][]=new Array();//REPLICAR DE LA MATRIZ DE JUEGO
  
  // @ViewChild('canvasRef') canvasRef: ElementRef; referencia elementos html
  constructor() { }
  ngOnInit() {
  }

   //FUNCION PARA REPLICAR EL JUEGO EN UNA MATRIZ
   crearMatriz(){ 
    for (let a = 0; a < this.tam; a++) {
      let array = new Array;
      for(let s = 0; s < this.tam; s++){
        array[s] = 0;//CREA UN ARRAY PARA CADA FILA
      }
      this.matrix[a] = array//UNE CADA ARRAY,FORMA MATRIZ
    }
  }

  // -----------------------------------------------------------------------------------------------------
  // FUNCIÓN QUE PINTA UN CUADRO CUANDO LEE UN CLICK EN EL CANVAS
  // -----------------------------------------------------------------------------------------------------
  drawSomething(event) {
    const canvas: any = document.getElementById('stage');
    if (canvas.getContext) { // CHECKEA QUE EL CONTEXTO EXISTA
      let ctx = canvas.getContext('2d');
      let i = event.offsetX; // UBICA LA COORDENADA X
      let j = event.offsetY; // UBICA LA COORDENADA Y
    //  alert('POS X: ' + (i) + 'POS Y: ' + (j) );
   //   ctx.fillRect(1 * 90, 2 * 90, 90, 90); // pinta pos 1, x= 1*90, y=2 * 90
   /*    if ( (i >= 1 * 90 && i <= 1 * 90 + 90) && (j >= 2 * 90 && j <= 2 * 90 + 90) ) {
        ctx.fillStyle = 'rgb(160, 140, 160)'; // DEFINE EL COLOR DE LA FIGUTA
        ctx.fillRect(1 * 90, 2 * 90, 90, 90); // DEFINE LA POSICIÒN A PINTAR´
      } */
      for (let x = 0; x <= this.tam; x++) {// voy a suponer que el tablero es de tam 4
        for (let y = 0; y <= this.tam; y++) {
          if ( (i >= x * 90 && i <= x * 90 + 90) && (j >= y * 90 && j <= y * 90 + 90) ) {
            if (this.matrix[y][x] == 0) { //VERIFICA QUE LA CASILLA NO TIENE FICHA
              if (this.turno == 1) {//JUGADOR 1
                this.matrix[y][x] = 1;//MARCA LA EN LA MATRIZ CON LA FICHA JUGADOR 1
                this.turno = 2;//CAMBIO DE TURNO
                ctx.fillStyle = 'rgb(160, 140, 160)'; // DEFINE EL COLOR DE LA FIGUTA
                ctx.fillRect(x * 90, y * 90, 90, 90);
              }
              else if (this.turno == 2) {//JUGADOR 2
                this.matrix[y][x] = 2//MARCA LA EN LA MATRIZ CON LA FICHA JUGADOR 2
                this.turno = 1//CAMBIO DE TURNO
                ctx.fillStyle = 'rgb(190, 100, 80)'; // DEFINE EL COLOR DE LA FIGUTA
                ctx.fillRect(x * 90, y * 90, 90, 90);
              }
              //console.log(this.matrix)
            }
            else { 
              alert("Jugada no válida")
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
  drawRectable( tamano: number) { // RECIBE EL TAMAÑO DEL TABLERO: N X N
    const canvas: any = document.getElementById('stage');
    canvas.width = tamano * 90;  // VARIABLES QUE ACTUALIZAN LOS VALORES DEL CANVAS DE ACUERDO AL TAMAÑO DEL TABLERO
    canvas.height = tamano * 90;
    console.log(tamano);
    this.crearMatriz()
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
  }

  winCondition(cantidad: number) {
   console.log('Cantidad fichas de gane: ', cantidad);
  }

}
