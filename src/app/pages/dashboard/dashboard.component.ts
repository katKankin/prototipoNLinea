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
<<<<<<< HEAD
  fichasJ1: number = 0;
  fichasJ2: number = 0;
  // VER MODELO models.game
  game: Game; // VARIABLE DE TIPO MODELO JUEGO (AQUÍ SE CARGAN LOS DATOS DEL JSON)

  // SE INYECTA SERVICE AL COMPONENTE: (VER SERVICES game.service.ts)
=======
  fichasJ1: number = 1;
  fichasJ2: number = 1;
  game: Game;
  control = 0; // VARIABLE PARA COLOCAR UNA FICHA UNA FILA ANTERIOR SI LA ACTUAL ESTA LLENA
  numeros2: number[] =new Array(); // ARREGLO QUE SE USA PARA ALACENAR LOS NUMEROS GENERADOS AL AZAR
>>>>>>> 9f5b919778c73c7463b7dd47d5117b2a00963260
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
                  this.verificarGane();
                } else if (this.matrix[y + 1][x] !== 0) { // JUGAR SOBRE UNA FICHA
                  this.matrix[y][x] = 1; // FICHA JUGADOR 1
                  ctx.fillStyle = 'rgb(160, 140, 160)';
                  ctx.fillRect(x * 90, y * 90, 90, 90);
                  this.turno = 2; // CAMBIO DE TURNO
                  this.verificarGane();
                } else {
                  alert( 'Jugada invalida, debe de tener una ficha abajo');
                }
              } else if (this.turno === 2) { // JUGADOR 2
                if ((y + 1 === this.tam) && (this.matrix[y][x] === 0)) { // VERIFICA PARA COLOCAR LA FICHA EN LA ULTIMA FILA J2
                  this.matrix[y][x] = 2; // FICHA JUGADOR 2
                  ctx.fillStyle = 'rgb(190, 100, 80)'; // DEFINE EL COLOR DE LA FIGUTA
                  ctx.fillRect(x * 90, y * 90, 90, 90);
                  this.turno = 1; // CAMBIO DE TURNO
                  this.verificarGane();
                } else if (this.matrix[y + 1][x] !== 0) { // JUGAR SOBRE UNA FICHA
                  this.matrix[y][x] = 2; // FICHA JUGADOR 2
                  ctx.fillStyle = 'rgb(190, 100, 80)';
                  ctx.fillRect(x * 90, y * 90, 90, 90);
                  this.turno = 1; // CAMBIO DE TURNO
                  this.verificarGane();
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

  // JUGADOR AUTOMATICO
  jugaadorAutomatico(event){
    this.random(); // GENERA UNA LISTA DE NUMEROS RANDOM CON EL LA CANTIDAD DE CASILLAS(TAM)
    let yA = this.tam-1; // PARA COLOCAR LAS FICHAS EN LA FILA BASE DEL TABLERO
    const canvas: any = document.getElementById('stage');
    if (canvas.getContext) { // CHECKEA QUE EL CONTEXTO EXISTA
      let ctx = canvas.getContext('2d');
      let i = event.offsetX; // UBICA LA COORDENADA X
      let j = event.offsetY; // UBICA LA COORDENADA Y
      for (let x = 0; x <= this.tam; x++) {// voy a suponer que el tablero es de tam 4
        for (let y = 0; y <= this.tam; y++) {
          if ( (i >= x * 90 && i <= x * 90 + 90) && (j >= y * 90 && j <= y * 90 + 90) ) {
            if ( (y + 1 == this.tam) && (this.matrix[y][x] == 0) ) { // VERIFICA PARA COLOCAR LA FICHA EN LA ULTIMA FILA
              this.matrix[y][x] = 1; // COLOCA FICHA 1
              ctx.fillStyle = 'rgb(160, 140, 160)'; // DEFINE EL COLOR DE LA FIGUTA
              ctx.fillRect(x * 90, y * 90, 90, 90);
              this.turno = 0; // CAMBIO DE TURNO
              this.control++;
              this.verificarGane();

              // LOGICA JUGADOR AUTOMATICO PARA LA BASE DEL TABLERO
                for (let xA = 0; xA <= this.tam; xA++) { //CICLO PARA RECORRER EL LISTA DE NUMEROS RANDOM 
                  if ( (this.matrix[yA][this.numeros2[xA]] == 0) && (this.turno == 0) ) { // VERIFICA QUE EN LA MATRIZ SE PUEDA COLOCAR LA FICHA
                    this.matrix[yA][this.numeros2[xA]] = 2; // COLOCA FICHA 2 (JUGADOR AUTOMATICO)
                    //console.log(this.matrix)
                    ctx.fillStyle = 'rgb(120, 160, 127)'; // DEFINE EL COLOR DE LA FIGUTA
                    ctx.fillRect(this.numeros2[xA] * 90, yA * 90, 90, 90);
                    this.turno = 1; // CAMBIO DE TURNO
                    this.control++;
                    this.verificarGane();
                  }
                }

                // SI LA FILA BASE ESTA LLENA COLOCA LA FICHA JUGADOR AUTOMATICO 1 FILA ARRIBA
                if (this.control==this.tam) {
                  for (let xA = 0; xA <= this.tam; xA++) { //CICLO PARA RECORRER EL LISTA DE NUMEROS RANDOM 
                    if ( (this.matrix[yA-1][this.numeros2[xA]] == 0) && (this.turno == 0) ) { // VERIFICA QUE EN LA MATRIZ SE PUEDA COLOCAR LA FICHA
                      this.matrix[yA-1][this.numeros2[xA]] = 2; // COLOCA FICHA 2 (JUGADOR AUTOMATICO)
                      ctx.fillStyle = 'rgb(120, 160, 127)'; // DEFINE EL COLOR DE LA FIGUTA
                      ctx.fillRect(this.numeros2[xA] * 90, (yA-1) * 90, 90, 90);
                      this.turno = 1; // CAMBIO DE TURNO
                      this.control = 0;
                      this.verificarGane();
                    }
                  }
                }
                
                // LOGICA JUGADOR AUTOMATICO PARA LA BASE DEL TABLERO
              } else if ( (this.matrix[y + 1][x] != 0 ) && (this.matrix[y][x] == 0) && (this.turno == 1) ) { // JUGAR SOBRE UNA FICHA
                this.matrix[y][x] = 1; // FICHA JUGADOR 1
                ctx.fillStyle = 'rgb(160, 140, 160)';
                ctx.fillRect(x * 90, y * 90, 90, 90);
                this.control++;
                this.turno = 0; // CAMBIO DE TURNO
                this.verificarGane();
                //console.log(this.matrix)
                
                // LOGICA JUGADOR AUTOMATICO PARA DEMAS TABLERO
                for (let i = 0; i <= this.tam; i++) { // CICLO PARA RECORRER EL LISTA DE NUMEROS RANDOM 
                  if ( (this.matrix[y][this.numeros2[i]] == 0) && (this.turno == 0) ) { // VERIFICA QUE EN LA MATRIZ SE PUEDA COLOCAR LA FICHA
                    if ( (this.matrix[y+1][this.numeros2[i]] == 0) ) { // POSICIONA LA FICHA EN LA ANTERIOR FILA SI ESTA VACIA
                      this.matrix[y+1][this.numeros2[i]]=2; // FICHA JUGADOR 2
                      this.turno = 1; // CAMBIO DE TURNO
                      ctx.fillStyle = 'rgb(120, 160, 127)'; // DEFINE EL COLOR DE LA FIGUTA
                      ctx.fillRect(this.numeros2[i] * 90, (y+1) * 90, 90, 90);
                      this.verificarGane();
                    } 
                    else if (this.matrix[y][this.numeros2[i]] == 0){ // SI TIENE UNA FICHA ABAJO SE COLOCA LA FICHA
                      this.matrix[y][this.numeros2[i]] = 2; // FICHA JUGADOR 2
                      this.turno = 1;// CAMBIO DE TURNO
                      ctx.fillStyle = 'rgb(120, 160, 127)'; // DEFINE EL COLOR DE LA FIGUTA
                      ctx.fillRect(this.numeros2[i] * 90, y * 90, 90, 90);
                      this.verificarGane();
                    }
                  }
                }
              }
              else {
                let r = Math.floor ( Math.random()*(this.tam)) // GENERA NUMERO RANDOM EN EL RANGO DEL TAMAÑO DE LA FILA
                this.matrix[y][r] = 2; // FICHA JUGADOR 2
                ctx.fillStyle = 'rgb(160, 140, 160)';
                ctx.fillRect(r * 90, y * 90, 90, 90);
                this.turno = 1;// CAMBIO DE TURNO
                this.verificarGane();
              }
            }
            //console.log(this.matrix)
          } 
        }
      }
    }

  random(){
    let numeros = []; // ARREGLO PARA ALMACENAR NUMEROS
    while (numeros.length < this.tam ) { //
      let numeroAleatorio = Math.floor ( Math.random()*(this.tam)); //GENERA UN NUMERO AL AZAR, RANGO ENTRE 0 Y EL TAMAÑO DE LA FILA
      let existe = false; //CONDICION PARA NO REPETIR NUMEROS
      for (let i=0;i<numeros.length;i++) { // RECORRE EL ARRELGO "NUMEROS"
        if (numeros [i] == numeroAleatorio) { // CONDICION QUE VERIFICA SI EL NUMERO GENERADO ES IGUAL AL NUMERO ALMACENADO
          existe = true; // CONDICION PARA NO REPETIR NUMEROS 
        break;
      }
    }
    if (!existe) { // VERIFICA SI EL NUMERO NO EXISTE
      numeros[numeros.length] = numeroAleatorio; // AGREGA EL NUMERO AL ARREGLO
    }
  }
  this.numeros2 = numeros; //ALMACENA LA SECUENCIA DE NUMEROS EN UN ARREGLO GLOBAL
}

 //VERFICAR GANE
  verificarGane(){
    this.verificarGaneHorizontal();
    this.verificarGaneVertical();
    this.verificarGaneDiagonalArriba();
    this.verificarGaneDiagonalAbajo();
  }

 // VERIFICA EL GANE EN HORIZONTAL
  verificarGaneHorizontal() {
    //console.log(this.matrix)
    for (let i = 0; i < this.tam; i++) { // RECORRE COLUMNAS
      for (let e = 0; e < this.tam; e++) { // RECORRE FILAS
        if ( (this.matrix[i][e] == 1) && (this.matrix[i][e+1] == 1) ) { // VERIFICA QUE HAYA MAS DE 1 FICHA JUNTA
          this.fichasJ1++; // AUMENTA LA CANTIDAD DE FICHA DEL JUGADOR 1
          this.matrix[i][e] = 3; // CAMBIA DE 1 A 3 PARA CONTAR LAS FICHAS SOLO 1 VEZ
          e++; // VERIFICA SI LA SIGUIENTE FICHA ES DEL JUGADOR 1
          if (this.fichasJ1 >= this.cant) { // MAYOR O IGUAL PORQUE EL GANE SE PUEDE FORMAR CON UNA FICHA MAS
            alert("Jugador 1 ha ganado");
            this.fichasJ1 = 0;
          }
        }
        if ( (this.matrix[i][e] == 2) && (this.matrix[i][e+1] == 2) ) { // VERIFICA QUE HAYA MAS DE 1 FICHA JUNTA
          this.fichasJ2++; // AUMENTA LA CANTIDAD DE FICHA DEL JUGADOR 2
          this.matrix[i][e] = 4; // CAMBIA DE 2 A 4 PARA CONTAR LAS FICHAS SOLO 1 VEZ
          e++;// VERIFICA SI LA SIGUIENTE FICHA ES DEL JUGADOR 2
          if (this.fichasJ2 >= this.cant) { // MAYOR O IGUAL PORQUE EL GANE SE PUEDE FORMAR CON UNA FICHA MAS
            alert("Jugador 2 ha ganado");
            this.fichasJ1 = 0;
          }
        }
      }
    }
  }

  // VERIFICA EL GANE EN VERTICAL
  verificarGaneVertical(){ 
    for (let i = 0; i < this.tam; i++) { // RECORRE COLUMNAS
      for (let e = 0; e < this.tam; e++) { // RECORRE FILAS
        if ( (this.matrix[i][e] == 1) && (this.matrix[i-1][e] == 1) ) { // VERIFICA GANE JUGADOR 1 SOLO PARA 2 FICHAS JUNTAS
          this.matrix[i][e] = 3; // CAMBIA DE 1 A 3 PARA CONTAR LAS FICHAS SOLO 1 VEZ
          i--; // VERIFICA SI LA ANTERIOR FICHA ES DEL JUGADOR 1
          this.fichasJ1++; // AUMENTA LA CANTIDAD DE FICHA DEL JUGADOR 1
          if (this.fichasJ1+1 >= this.cant) { // MAYOR O IGUAL PORQUE EL GANE SE PUEDE FORMAR CON UNA FICHA MAS
            alert("Jugador 2 ha ganado");
            this.fichasJ1 = 0;
          }
<<<<<<< HEAD
        } else if (( this.matrix[i][e] === 2) && (this.matrix[i][e + 1] === 2)) { // VERIFICA GANE JUGADOR 2 SOLO PARA 2 FICHAS JUNTAS
          this.fichasJ2++;
=======
        } 

        if ( (this.matrix[i][e] == 2) && (this.matrix[i-1][e] == 2) ) { // VERIFICA GANE JUGADOR 2 SOLO PARA 2 FICHAS JUNTAS
>>>>>>> 9f5b919778c73c7463b7dd47d5117b2a00963260
          this.matrix[i][e] = 4; // CAMBIA DE 2 A 4 PARA CONTAR LAS FICHAS SOLO 1 VEZ
          i--; // VERIFICA SI LA ANTERIOR FICHA ES DEL JUGADOR 1
          this.fichasJ2++; // AUMENTA LA CANTIDAD DE FICHA DEL JUGADOR 2
          if (this.fichasJ2 >= this.cant) { // MAYOR O IGUAL PORQUE EL GANE SE PUEDE FORMAR CON UNA FICHA MAS
            alert("Jugador 2 ha ganado");
            this.fichasJ1 = 0;
          }
        }
      }
    }
  }

  // VERIFICA EL GANE EN DIAGONAL, DE ABAJO A ARRIBA
  verificarGaneDiagonalArriba(){
    for (let i = 0; i < this.tam; i++) { // RECORRE COLUMNAS
      for (let e = 0; e < this.tam; e++){ // RECORRE FILAS
        if ( (this.matrix[i][e] == 1) && (this.matrix[i-1][e+1] == 1) ) { // VERIFICA QUE HAYA MAS DE 1 FICHA JUNTA
          this.matrix[i][e] = 3; // CAMBIA DE 1 A 3 PARA CONTAR LAS FICHAS SOLO 1 VEZ
          this.fichasJ1++; // AUMENTA LA CANTIDAD DE FICHA DEL JUGADOR 1
          if (this.fichasJ1 >= this.cant) { // MAYOR O IGUAL PORQUE EL GANE SE PUEDE FORMAR CON UNA FICHA MAS
            alert("Jugador 1 ha ganado");
            this.fichasJ1 = 0;
          }
        }

        if ( (this.matrix[i][e] == 2) && (this.matrix[i-1][e+1] == 2) ) { // VERIFICA QUE HAYA MAS DE 1 FICHA JUNTA
          this.matrix[i][e] = 4; // CAMBIA DE 2 A 4 PARA CONTAR LAS FICHAS SOLO 1 VEZ
          this.fichasJ2++; // AUMENTA LA CANTIDAD DE FICHA DEL JUGADOR 2
          if (this.fichasJ2 >= this.cant) { // MAYOR O IGUAL PORQUE EL GANE SE PUEDE FORMAR CON UNA FICHA MAS
            alert("Jugador 2 ha ganado");
            this.fichasJ1 = 0;
          }
        }
      }
    }
  }

  // VERIFICA EL GANE EN DIAGONAL, DE ARRIBA A ABAJO
  verificarGaneDiagonalAbajo(){
    for (let i = 0; i < this.tam; i++) { // RECORRE COLUMNAS
      for (let e = 0; e < this.tam; e++){ // RECORRE FILAS
        if ( (this.matrix[i][e] == 1) && (this.matrix[i-1][e-1] == 1) ) { // VERIFICA QUE HAYA MAS DE 1 FICHA JUNTA
          this.matrix[i][e] = 3; // CAMBIA DE 1 A 3 PARA CONTAR LAS FICHAS SOLO 1 VEZ
          this.fichasJ1++; // AUMENTA LA CANTIDAD DE FICHA DEL JUGADOR 1
          if (this.fichasJ1 >= this.cant) { // MAYOR O IGUAL PORQUE EL GANE SE PUEDE FORMAR CON UNA FICHA MAS
            alert("Jugador 1 ha ganado");
            this.fichasJ1 = 0;
          }
        }

        if ( (this.matrix[i][e] == 2) && (this.matrix[i-1][e-1] == 2) ) { // VERIFICA QUE HAYA MAS DE 1 FICHA JUNTA
          this.matrix[i][e] = 4; // CAMBIA DE 1 A 3 PARA CONTAR LAS FICHAS SOLO 1 VEZ
          this.fichasJ2++; // AUMENTA LA CANTIDAD DE FICHA DEL JUGADOR 1
          if (this.fichasJ2 >= this.cant) { // MAYOR O IGUAL PORQUE EL GANE SE PUEDE FORMAR CON UNA FICHA MAS
            alert("Jugador 2 ha ganado");
            this.fichasJ1 = 0;
          }
        }
      }
    }
  }
}
