import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private authService: AuthService, private router: Router) { }




  onLogout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }

  getSignedInUser() {
    var today = new Date()
    var curHr = today.getHours()

    var timeOfDay="";

    if (curHr < 12) {
      timeOfDay = 'Good morning'
    } else if (curHr < 18) {
      timeOfDay = 'Good afternoon';
    } else {
      timeOfDay = 'Good evening';
    }

    return timeOfDay + " " + this.authService.getSignedInUser();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

}
