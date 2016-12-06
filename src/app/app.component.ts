import { Component } from '@angular/core';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  user = {};

  constructor(public af: AngularFire) {
    this.af.auth.subscribe(user => {
      if (user) {
        // user logged in
        this.user = user;
        console.log('login', this.user);
      } else {
        // user not logged in
        console.log('logout');
        this.user = {};
      }
    });
  }

  login() {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Redirect
    });
  }

  logout() {
    this.af.auth.logout();
  }
}
