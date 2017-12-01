import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeauture = "recipe";

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyCorxRT34mMEGzkdVzGY5yQW1nwzyqWvOQ",
      authDomain: "ng-recipe-book-209c7.firebaseapp.com"
    })
  }

  onNavigate(feauture: string) {
    this.loadedFeauture = feauture;
  }
}
