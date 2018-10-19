import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
import {AngularFireDatabase } from 'angularfire2/database';
@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  public userDetails: firebase.User = null;
  constructor(
    public _firebaseAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFireDatabase, // REFERENCIA A LA REALTIMEDATABASE
    public afAuth: AngularFireAuth) {
      this.user = _firebaseAuth.authState;
      this.user.subscribe((user) => {
        if (user) {
          this.userDetails = user;
        } else {
          this.userDetails = null;
        }
      }
    );
  }
   // ----------------- FUNCIONES PARA LA GESTIÓN DE USUARIOS EN FIREBASE -------------------
   addUser(data, uId, number) { // FUNCIÓN QUE GUARDA A UN USUARIO EN LA BASE DE DATOS
    const obj = this.db.database.ref('Usuarios');
    obj.push({email: data, uid: uId, juegoID: number}); // SE DEFINE CUÁLES DATOS SE VAN A GUARDAR
    // console.log('Success');
  }
  showUser(uidA) { // MUESTRA A UN USUARIO CUANDO INICIA SESIÓN DESDE
  if (this.db.database.ref('Usuarios/' + this.userDetails.uid).equalTo(uidA)) {
      // console.log( 'User EMAIL: ' + this.userDetails.email + 'UID-AUTH:' + this.userDetails.uid);
  } else {
    console.log ('Unknown data ');
  }
  }
  signInRegular(email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential( email, password );
    this.showUser(this.afAuth.auth.currentUser.uid);
    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signInWithGoogle() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      this.afAuth.auth.signInWithPopup(provider)
      .then(res => {
        resolve(res);
      //  --------ESTA SECCIÓN VERIFICA SI EL USUARIO EXISTE EN LA BD, SI NO EXISTE SE AGREGA A LA BD----
      const uidA = this.afAuth.auth.currentUser.uid;
      if (this.db.database.ref('Usuarios/' + this.userDetails.uid).equalTo(uidA) ) {
      // console.log( 'The user is already registered');
      } else {
        this.addUser(this.afAuth.auth.currentUser.email, this.afAuth.auth.currentUser.uid, 1);
      }
     // ----------------------------------------------------------
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }

  signInWithFacebook() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth.signInWithPopup(provider)
      .then(res => {
        resolve(res);
        //  -----ESTA SECCIÓN VERIFICA SI EL USUARIO EXISTE EN LA BD, SI NO EXISTE SE AGREGA A LA BD----
      const uidA = this.afAuth.auth.currentUser.uid;
      if (this.db.database.ref('Usuarios/' + this.userDetails.uid).equalTo(uidA) ) {
      console.log( 'Unknow user');
      } else {
        this.addUser(this.afAuth.auth.currentUser.email, this.afAuth.auth.currentUser.uid, 1);
      }
     // ----------------------------------------------------------
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }

  registerUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, pass)
      .then( userData =>  resolve(userData),
      err => reject (err));
      // ------- CADA REGISTRO DE USUARIO CON EMAIL SE GUARDA EN REALTIMEDB -----------
      this.addUser(this.afAuth.auth.currentUser.email, this.afAuth.auth.currentUser.uid, 1);
    });
  }
  isLoggedIn() {
    if (this.userDetails == null ) {
      return false;
    } else {
      return true;
    }
  }
  logout() {
    this._firebaseAuth.auth.signOut()
    .then((res) => this.router.navigate(['/']));
    return this.afAuth.auth.signOut();
  }
}
