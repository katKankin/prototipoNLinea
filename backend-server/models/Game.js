// clase
module.exports = class Game {
    // COMO UNA CLASE NORMAL, AQUÍ ESTÁ MI MODELO COMO EN EL FRONT END, QUE TIENE MI MATRIZ
    // EN ESTE MODELO ES DONDE SE CARGARÁN LOS DATOS DEL REQUEST DE MI FRONT END
    // ES UNA CLASE NORMAL CON METODOS NADA MÁS ES EL MODELO
    // LOGICA DE JUEGO
    constructor(size, toWin) {
        this.matrix = [];
        this.toWin = toWin;
        this.size = size;
        this.fichasJ1 = 1;
        this.fichasJ2 = 1;
    }


    createBoard() { // se puede usar a lo largo d toda la clase la var matrix
        for (var i = 0; i < this.size; i++) {
            this.matrix[i] = new Array(this.size);
            for (var j = 0; j < this.size; j++) {
                this.matrix[i][j] = 0;
            }
        }
        console.log('CREATE_BOARD()');
    }
};