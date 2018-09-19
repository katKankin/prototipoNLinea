// clase
module.exports = class Game {
    // COMO UNA CLASE NORMAL, AQUÍ ESTÁ MI MODELO COMO EN EL FRONT END, QUE TIENE MI MATRIZ
    // EN ESTE MODELO ES DONDE SE CARGARÁN LOS DATOS DEL REQUEST DE MI FRONT END
    // ES UNA CLASE NORMAL CON METODOS NADA MÁS ES EL MODELO
    // LOGICA DE JUEGO
    constructor(size, toWin) {
        this.matrix = [];
        this.size = size;
        this.toWin = toWin;
        this.fichasJ1 = 1;
        this.fichasJ2 = 1;
        this.turno = 1;
        this.jugada = true; // verifica si la jugada es posible
        this.win = false;
        this.coordX = 0;
        this.coordY = 0;
    }


    createBoard() { // se puede usar a lo largo d toda la clase la var matrix
        for (var i = 0; i < this.size; i++) {
            this.matrix[i] = new Array(this.size);
            for (var j = 0; j < this.size; j++) {
                this.matrix[i][j] = 0;
            }
        }
    }
    tryPlay(x, y) {
        this.coordX = x;
        this.coordY = y;
        if (this.turno === 1) { // FICHA JUGADOR 1
            if ((y + 1 === this.size) && (this.matrix[y][x] === 0)) { // VERIFICA PARA COLOCAR LA FICHA EN LA ULTIMA FILA J1
                this.matrix[y][x] = 1; // COLOCA FICHA 
                this.turno = 2; // CAMBIO DE TURNO
                this.jugada = true;
                this.verificarGane();
            } else if (this.matrix[y + 1][x] !== 0) { // JUGAR SOBRE UNA FICHA
                this.matrix[y][x] = 1; // FICHA JUGADOR 1
                this.turno = 2; // CAMBIO DE TURNO
                this.jugada = true;
                this.verificarGane();
            } else {
                this.jugada = false;
            }
        } else if (this.turno === 2) { // JUGADOR 2
            if ((y + 1 === this.size) && (this.matrix[y][x] === 0)) { // VERIFICA PARA COLOCAR LA FICHA EN LA ULTIMA FILA J2
                this.matrix[y][x] = 2; // FICHA JUGADOR 2
                this.turno = 1; // CAMBIO DE TURNO
                this.jugada = true;
                this.verificarGane();
            } else if (this.matrix[y + 1][x] !== 0) { // JUGAR SOBRE UNA FICHA
                this.matrix[y][x] = 2; // FICHA JUGADOR 2
                this.turno = 1; // CAMBIO DE TURNO
                this.jugada = true;
                this.verificarGane();
            } else {
                this.jugada = false;
            }
        }
    }
    verificarGane() { // condicionar:
            this.verificarGaneHorizontal();
            this.verificarGaneVertical();
            this.verificarGaneDiagonalArriba();
            this.verificarGaneDiagonalAbajo();
        }
        // VERIFICA EL GANE EN HORIZONTAL
    verificarGaneHorizontal() {
        //console.log(this.matrix)
        for (var i = 0; i < this.size; i++) { // RECORRE COLUMNAS
            for (var e = 0; e < this.size; e++) { // RECORRE FILAS
                if ((this.matrix[i][e] == 1) && (this.matrix[i][e + 1] == 1)) { // VERIFICA QUE HAYA MAS DE 1 FICHA JUNTA
                    this.fichasJ1++; // AUMENTA LA CANTIDAD DE FICHA DEL JUGADOR 1
                    this.matrix[i][e] = 3; // CAMBIA DE 1 A 3 PARA CONTAR LAS FICHAS SOLO 1 VEZ ???
                    e++; // VERIFICA SI LA SIGUIENTE FICHA ES DEL JUGADOR 1
                    if (this.fichasJ1 >= this.toWin) { // MAYOR O IGUAL PORQUE EL GANE SE PUEDE FORMAR CON UNA FICHA MAS
                        // alert("Jugador 1 ha ganado");
                        this.turno = 1; // se cambia porque en la llamada, el turno se cambia antes de verificar
                        this.win = true;
                        this.fichasJ1 = 0;
                    }
                }
                if ((this.matrix[i][e] == 2) && (this.matrix[i][e + 1] == 2)) { // VERIFICA QUE HAYA MAS DE 1 FICHA JUNTA
                    this.fichasJ2++; // AUMENTA LA CANTIDAD DE FICHA DEL JUGADOR 2
                    this.matrix[i][e] = 4; // CAMBIA DE 2 A 4 PARA CONTAR LAS FICHAS SOLO 1 VEZ
                    e++; // VERIFICA SI LA SIGUIENTE FICHA ES DEL JUGADOR 2
                    if (this.fichasJ2 >= this.toWin) { // MAYOR O IGUAL PORQUE EL GANE SE PUEDE FORMAR CON UNA FICHA MAS
                        // alert("Jugador 2 ha ganado");
                        this.turno = 2;
                        this.win = true;
                        this.fichasJ1 = 0; // será .fichasJ2???
                    }
                }
            }
        }
    }

    // VERIFICA EL GANE EN VERTICAL
    verificarGaneVertical() {
        for (var i = 0; i < this.size; i++) { // RECORRE COLUMNAS
            for (var e = 0; e < this.size; e++) { // RECORRE FILAS
                if ((this.matrix[i][e] == 1) && (this.matrix[i - 1][e] == 1)) { // VERIFICA GANE JUGADOR 1 SOLO PARA 2 FICHAS JUNTAS
                    this.matrix[i][e] = 3; // CAMBIA DE 1 A 3 PARA CONTAR LAS FICHAS SOLO 1 VEZ
                    i--; // VERIFICA SI LA ANTERIOR FICHA ES DEL JUGADOR 1
                    this.fichasJ1++; // AUMENTA LA CANTIDAD DE FICHA DEL JUGADOR 1
                    if (this.fichasJ1 + 1 >= this.toWin) { // MAYOR O IGUAL PORQUE EL GANE SE PUEDE FORMAR CON UNA FICHA MAS
                        // alert("Jugador 2 ha ganado");
                        this.turno = 1; // se cambia porque en la llamada, el turno se cambia antes de verificar
                        this.win = true;
                        this.fichasJ1 = 0;
                    }
                }

                if ((this.matrix[i][e] == 2) && (this.matrix[i - 1][e] == 2)) { // VERIFICA GANE JUGADOR 2 SOLO PARA 2 FICHAS JUNTAS
                    this.matrix[i][e] = 4; // CAMBIA DE 2 A 4 PARA CONTAR LAS FICHAS SOLO 1 VEZ
                    i--; // VERIFICA SI LA ANTERIOR FICHA ES DEL JUGADOR 1
                    this.fichasJ2++; // AUMENTA LA CANTIDAD DE FICHA DEL JUGADOR 2
                    if (this.fichasJ2 >= this.toWin) { // MAYOR O IGUAL PORQUE EL GANE SE PUEDE FORMAR CON UNA FICHA MAS
                        // alert("Jugador 2 ha ganado");
                        this.turno = 2; // se cambia porque en la llamada, el turno se cambia antes de verificar
                        this.win = true;
                        this.fichasJ1 = 0;
                    }
                }
            }
        }
    }

    // VERIFICA EL GANE EN DIAGONAL, DE ABAJO A ARRIBA
    verificarGaneDiagonalArriba() {
        for (var i = 0; i < this.size; i++) { // RECORRE COLUMNAS
            for (var e = 0; e < this.size; e++) { // RECORRE FILAS
                if ((this.matrix[i][e] == 1) && (this.matrix[i - 1][e + 1] == 1)) { // VERIFICA QUE HAYA MAS DE 1 FICHA JUNTA
                    this.matrix[i][e] = 3; // CAMBIA DE 1 A 3 PARA CONTAR LAS FICHAS SOLO 1 VEZ
                    this.fichasJ1++; // AUMENTA LA CANTIDAD DE FICHA DEL JUGADOR 1
                    if (this.fichasJ1 >= this.toWin) { // MAYOR O IGUAL PORQUE EL GANE SE PUEDE FORMAR CON UNA FICHA MAS
                        // alert("Jugador 1 ha ganado");
                        this.turno = 1; // se cambia porque en la llamada, el turno se cambia antes de verificar
                        this.win = true;
                        this.fichasJ1 = 0;
                    }
                }

                if ((this.matrix[i][e] == 2) && (this.matrix[i - 1][e + 1] == 2)) { // VERIFICA QUE HAYA MAS DE 1 FICHA JUNTA
                    this.matrix[i][e] = 4; // CAMBIA DE 2 A 4 PARA CONTAR LAS FICHAS SOLO 1 VEZ
                    this.fichasJ2++; // AUMENTA LA CANTIDAD DE FICHA DEL JUGADOR 2
                    if (this.fichasJ2 >= this.toWin) { // MAYOR O IGUAL PORQUE EL GANE SE PUEDE FORMAR CON UNA FICHA MAS
                        // alert("Jugador 2 ha ganado");
                        this.turno = 2; // se cambia porque en la llamada, el turno se cambia antes de verificar
                        this.win = true;
                        this.fichasJ1 = 0;
                    }
                }
            }
        }
    }

    // VERIFICA EL GANE EN DIAGONAL, DE ARRIBA A ABAJO
    verificarGaneDiagonalAbajo() {
        for (var i = 0; i < this.size; i++) { // RECORRE COLUMNAS
            for (var e = 0; e < this.size; e++) { // RECORRE FILAS
                if ((this.matrix[i][e] == 1) && (this.matrix[i - 1][e - 1] == 1)) { // VERIFICA QUE HAYA MAS DE 1 FICHA JUNTA
                    this.matrix[i][e] = 3; // CAMBIA DE 1 A 3 PARA CONTAR LAS FICHAS SOLO 1 VEZ
                    this.fichasJ1++; // AUMENTA LA CANTIDAD DE FICHA DEL JUGADOR 1
                    if (this.fichasJ1 >= this.toWin) { // MAYOR O IGUAL PORQUE EL GANE SE PUEDE FORMAR CON UNA FICHA MAS
                        // alert("Jugador 1 ha ganado");
                        this.turno = 1; // se cambia porque en la llamada, el turno se cambia antes de verificar
                        this.win = true;
                        this.fichasJ1 = 0;
                    }
                }

                if ((this.matrix[i][e] == 2) && (this.matrix[i - 1][e - 1] == 2)) { // VERIFICA QUE HAYA MAS DE 1 FICHA JUNTA
                    this.matrix[i][e] = 4; // CAMBIA DE 1 A 3 PARA CONTAR LAS FICHAS SOLO 1 VEZ
                    this.fichasJ2++; // AUMENTA LA CANTIDAD DE FICHA DEL JUGADOR 1
                    if (this.fichasJ2 >= this.toWin) { // MAYOR O IGUAL PORQUE EL GANE SE PUEDE FORMAR CON UNA FICHA MAS
                        // alert("Jugador 2 ha ganado");
                        this.turno = 2; // se cambia porque en la llamada, el turno se cambia antes de verificar
                        this.win = true;
                        this.fichasJ1 = 0;
                    }
                }
            }
        }
    }

};


/* */

/* for (let x = 0; x <= this.game.size; x++) {
        for (let y = 0; y <= this.game.size; y++) {
          if ( (i >= x * 90 && i <= x * 90 + 90) && (j >= y * 90 && j <= y * 90 + 90) ) {
            if (this.matrix[y][x] === 0) { // VERIFICA QUE LA CASILLA NO TIENE FICHA
              if (this.turno === 1) {// FICHA JUGADOR 1
                if ((y + 1  === this.game.size) && (this.matrix[y][x] === 0)) { // VERIFICA PARA COLOCAR LA FICHA EN LA ULTIMA FILA J1
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
                if ((y + 1 === this.game.size) && (this.matrix[y][x] === 0)) { // VERIFICA PARA COLOCAR LA FICHA EN LA ULTIMA FILA J2
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
          }
        }
      }*/