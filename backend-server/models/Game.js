// clase
module.exports = class Game {
    // COMO UNA CLASE NORMAL, AQUÍ ESTÁ MI MODELO COMO EN EL FRONT END, QUE TIENE MI MATRIZ
    // EN ESTE MODELO ES DONDE SE CARGARÁN LOS DATOS DEL REQUEST DE MI FRONT END
    // ES UNA CLASE NORMAL CON METODOS NADA MÁS ES EL MODELO
    constructor(size) {
            this.matrix = [];
            this.size = size;
        }
        // LOGICA

    createBoard() { // se puede usar a lo largo d toda la clase la var matrix
            console.log('CREATE_BOARD()');

        }
        // FULFILLING ARRAY 2D
        /*
        var nb = 4;
        var a = new Array(nb); // crea una matriz de longitud 4
        for (var i = 0; i < nb; i++) {
            a[i] = new Array(nb); // define cada elemento como una matriz de longitud 4
            for (var j = 0; j < nb; j++) {
                a[i][j] = "[" + i + "," + j + "]"; // asigna a cada elemento de la matriz bidimensional 
                // los valores de i y j
            }
        }
    
        */
};