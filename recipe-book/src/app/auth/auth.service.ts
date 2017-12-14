import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';


@Injectable()
export class AuthService {
  token: string;
  email: string;

  constructor(private router: Router) {

  }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(error => console.log(error))
  }

  signinUser(email: string, password: string) {
    
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
      response => {
        this.router.navigate(["/"]);
        firebase.auth().currentUser.getToken().then(
          (token: string) => this.token = token
          
        )
        firebase.auth().currentUser.sendEmailVerification().then(function() {
          // Email sent.
         }, function(error) {
          // An error happened.
         });
      }
      )
      .catch(
      error => console.log(error)
      );
  }

  loginWithFacebook() {
    return firebase.auth().signInWithPopup(
      new firebase.auth.FacebookAuthProvider).then(
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
     response => {
        this.router.navigate(["/"]);
        firebase.auth().currentUser.getToken().then(
          (token: string) => this.token = token
        )
      }
      )
      .catch(
      error => console.log(error)
      );
  }

  loginWithGoogle() {
    return firebase.auth().signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    ).then(
      response => {
        this.router.navigate(["/"]);
        firebase.auth().currentUser.getToken().then(
          (token: string) => this.token = token
        )
      }
      )
      .catch(
      error => console.log(error)
      );
  }

  getToken() {
    firebase.auth().currentUser.getToken()
      .then(
      (token: string) => this.token = token
      );
    return this.token;
  }

  getSignedInUser() {
    if(this.isAuthenticated())
    {
      var user = firebase.auth().currentUser;
      return user.email;
    }
    else {
      return null;
    }

  }

  isAuthenticated() {
    return this.token != null;
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }
}
