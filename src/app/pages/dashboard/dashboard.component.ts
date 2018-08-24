import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tam: number = 4;
  // @ViewChild('canvasRef') canvasRef: ElementRef; referencia elementos html
  constructor() { }
  ngOnInit() {
  }
  drawSomething() {
    alert('CLICK!!');

  }
  // FUNCIÓN QUE SE ENCARGA DE CREAR EL TABLERO DE JUEGO
  drawRectable( tamano: number) { // RECIBE EL TAMAÑO DEL TABLERO: N X N
    const canvas: any = document.getElementById('stage');
    console.log(tamano);
    if (canvas.getContext) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height); // LIMPIA EL CANVAS
      // CICLO QUE SE ENCARGA DE INSERTAR CADA FICHA
      for ( let i = 1; i <= tamano; i++) {
        for (let j = 1; j <= tamano; j++) {
          ctx.strokeRect(5 + i * 90, 5 + j * 90, 90, 90); // ES UNA FICHA CON FORMATO: (x,y,width,height)
          // this.capClick();
          // CONDICIÓN PARA PROBAR QUE SE LOGRA PINTAR UNA FICHA EN UNA POSICIÓN DADA
/*           if ( i === 3 && j === 3) {
            ctx.fillStyle = 'rgb(160, 140, 160)';
            ctx.fillRect(5 + i * 90, 5 + j * 90, 90, 90);
          }
          if ( i === 2 && j === 5) {
            ctx.fillStyle = 'rgb(140, 160, 100)';
            ctx.fillRect(5 + i * 90, 5 + j * 90, 90, 90);
          } */
        }
      }
    }
  }

  // FUNCIÓN PARA CAPTURAR EL CLICK
/*   capClick () {
    let canvas: any = document.getElementById('stage');
    canvas.addEventListener('click', function(event) {
    let xy = convertEventCoords(event, canvas);
    canvas.fillStyle = 'rgb(160, 140, 160)';
    canvas.getContext('2d').fillRect(5 + xy.x * 90 , 5 + xy.y * 90 , 90, 90);
    } );
  }

} */
/*  drawRectable() {
    let canvas = document.getElementById('stage');
    if (canvas.getContext) {
      let ctx = canvas.getContext('2d');
      let tamano = 6; // TAMAÑO DEL TABLERO: N X N
      // CICLO QUE SE ENCARGA DE INSERTAR CADA FICHA
      for ( let i = 1; i <= tamano; i++) {
        for (let j = 1; j <= tamano; j++) {
          ctx.strokeRect(5 + i * 90, 5 + j * 90, 90, 90); // ES UNA FICHA CON FORMATO: (x,y,width,height)
          // CONDICIÓN PARA PROBAR QUE SE LOGRA PINTAR UNA FICHA EN UNA POSICIÓN DADA
          if ( i === 3 && j === 3) {
            ctx.fillStyle = 'rgb(160, 140, 160)';
            ctx.fillRect(5 + i * 90, 5 + j * 90, 90, 90);
          }
          if ( i === 2 && j === 5) {
            ctx.fillStyle = 'rgb(140, 160, 100)';
            ctx.fillRect(5 + i * 90, 5 + j * 90, 90, 90);
          }
        }
      }
    }
  } */ }
