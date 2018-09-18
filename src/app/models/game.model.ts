
// simple example for indexing data into backend
export class Game {
    constructor(
        public matrix: number[][],
        public size: number = 4,
        public toWin: number = 4,
        public fichasJ1: number,
        public fichasJ2: number,
        public turno: number

    ) { }

}

