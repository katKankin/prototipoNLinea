import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// se declara porq el init-plugins no es reconocido y existe:
declare function init_plugins();
// tambn se puso en el pages.ts y en ngoninit de ese mismo

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( public router: Router ) { }

  ngOnInit() {
    init_plugins();
  }

  ingresar() {
    this.router.navigate([ '/dashboard']);

  }

}
