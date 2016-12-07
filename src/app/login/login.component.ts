import { Component } from '@angular/core';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2';

@Component({
  selector: 'login-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: any = null;
  provider: string = null;
  displayName: string = null;
  loginException: string = null

  constructor(public af: AngularFire) {
    this.af.auth.subscribe(user => {
      if (user) {
        // user logged in
        this.user = user;
        this.displayName = user.auth.displayName;
        this.provider = user.auth.providerData[0].providerId;
        console.log('login', this.user);
      } else {
        // user not logged in
        this.user = null;
        this.provider = null;
        console.log('logout');
      }
    });
  }

  login(provider: string) {
    let loginConfig: any = {
      method: AuthMethods.Redirect
    };
    if (provider === 'google') {
      loginConfig.provider = AuthProviders.Google;
    } else if (provider === 'twitter') {
      loginConfig.provider = AuthProviders.Twitter;
    } else if (provider === 'facebook') {
      loginConfig.provider = AuthProviders.Facebook;
    }
    this.af.auth.login(loginConfig);
  }

  logout() {
    this.provider = null;
    this.af.auth.logout();
  }
}
