import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Location } from '@angular/common';

// se declara porq el init-plugins no es reconocido y existe:
declare function init_plugins();
// tambn se puso en el pages.ts y en ngoninit de ese mismo

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  static location: Location;

  user = {
    email: '',
    password: ''
  };

  facebook = {
    loggedIn : false,
    name : '',
    email : '',
    profilePicture: ''
  };

  constructor( public router: Router,
    private _firebaseAuth: AngularFireAuth,
    private authService: AuthService,
    private location: Location,
    private _activatedRoute: ActivatedRoute,
    private afauth: AngularFireAuth, ) { }

  ngOnInit() {
    init_plugins();
  }

  ingresar() {
    this.router.navigate([ '/dashboard']);

  }

  signInWithEmailFist() { // Si es registrar es signed up
    this.authService.registerUser(this.user.email, this.user.password)
    .then((res) => {
      console.log(this.user.email);
      console.log(this.user.password);
    })
    .catch((err) => console.log('error: ' + err));
  }

  signInWithEmail() {
    this.authService.signInRegular(this.user.email, this.user.password)
    .then((res) => {
      console.log(res);
      this.ingresar();
    })
    .catch((err) => console.log('error: ' + err));
  }

  signInWithFacebook() {
    this.afauth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then(res => {
      console.log(res);
      this.ingresar();
    }); } // antes estaba )} , puse un ; porque tiraba error

    signInWithGoogle() {
      this.authService.signInWithGoogle()
      .then((res) => {
        console.log(res);
        this.ingresar();
        // this.location.go(window.location.href='http://google.com')
      })
      .catch((err) => console.log(err));
    }

    logoutwithfb() {
      this.facebook.loggedIn = false;
      this.afauth.auth.signOut();
      console.log('Out FB');
      this._firebaseAuth.auth.signOut(); // puse ;

      this._firebaseAuth.auth.signOut(); // puse ;
      console.log('Out');
      return this._firebaseAuth.auth.signOut();
    }
}
