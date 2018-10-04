import { Component, OnInit, Input } from '@angular/core';
// import { MenuService } from '../../services/service.index';
import { GameService } from '../../services/service.index';
import { Game } from '../../models/game.model';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: []
})
export class MenuComponent implements OnInit {
  game: Game;
  @Input() color1: any = 'rgb(255,0,0)';
  @Input() color2: any = 'rgb(255,0,0)';


  constructor( public _gaming: GameService) {
    this.game = new Game([], 4, 4, 1, 1, 1, true, false, 0, 0);
  }

  ngOnInit() {

    this.paint();
  }
  paint() { // RECIBE EL TAMAÑO DEL TABLERO: N X N //debería recibir el obj juego
    const canvas1: any = document.getElementById('player1');
    const canvas2: any = document.getElementById('player2');
    canvas1.width = 1 * 90;  // VARIABLES QUE ACTUALIZAN LOS VALORES DEL CANVAS DE ACUERDO AL TAMAÑO DEL TABLERO
    canvas1.height = 1 * 90;

    canvas2.width = 1 * 90;  // VARIABLES QUE ACTUALIZAN LOS VALORES DEL CANVAS DE ACUERDO AL TAMAÑO DEL TABLERO
    canvas2.height = 1 * 90;
        // se debe cambiar este ciclo x un ngFor y con una variable cargada desde el backend
    if (canvas1.getContext && canvas2.getContext) {
      const ctx1 = canvas1.getContext('2d');
      const ctx2 = canvas2.getContext('2d');
      ctx1.clearRect(0, 0, canvas1.width, canvas1.height); // LIMPIA EL CANVAS
      ctx1.strokeRect(0 * 90, 0 * 90, 90, 90); // ES UNA FICHA CON FORMATO: (x,y,width,height)

      ctx2.clearRect(0, 0, canvas2.width, canvas2.height); // LIMPIA EL CANVAS
      ctx2.strokeRect(0 * 90, 0 * 90, 90, 90); // ES UNA FICHA CON FORMATO: (x,y,width,height)
    }
   }
   setColor(newValue: string, player: string) {
     // console.log(newValue);
     const canvas: any = document.getElementById(player);
     if (canvas.getContext) {
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = newValue; // DEFINE EL COLOR DE LA FIGURA
      ctx.fillRect(0 * 90, 0 * 90, 90, 90);

     }
   }
}
