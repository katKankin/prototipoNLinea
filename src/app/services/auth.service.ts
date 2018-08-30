import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
//import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  
  constructor(
    public _firebaseAuth: AngularFireAuth, 
    private router: Router,
    public afAuth: AngularFireAuth) { 
      this.user = _firebaseAuth.authState;
      this.user.subscribe((user) => {
        if (user) {
          this.userDetails = user;
          //console.log(this.userDetails);
        }
        else {
          this.userDetails = null;
        }
      }
    );
  }

  signInRegular(email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential( email, password );
    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password)
  }

  signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    )
  }
  
  signInWithFacebook(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth.signInWithPopup(provider)
      .then(res => {
        resolve(res);
      },err => {
        console.log(err);
        reject(err);
      })
    })
  }

  registerUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, pass)
      .then( userData =>  resolve(userData),
      err => reject (err));
    });
  }

  /*getAuth() {
    return this.afAuth.authState.map(auth => auth);
  }*/

  isLoggedIn() {
    if (this.userDetails == null ) {
      return false;
    } 
    else {
      return true;
    }
  }
  
  logout() {
    this._firebaseAuth.auth.signOut()
    .then((res) => this.router.navigate(['/']));
    return this.afAuth.auth.signOut();
  } 
}
