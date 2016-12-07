import { Component } from '@angular/core';
import { AngularFire, AuthMethods, AuthProviders, FirebaseAuthState } from 'angularfire2';

import { ProfileModel } from '../shared/';

@Component({
  selector: 'login-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  profile: ProfileModel = null;

  constructor(public af: AngularFire) {
    this.authSubscription_();
  }

  authSubscription_() {
    this.af.auth.subscribe((user: FirebaseAuthState) => {
      if (user) {
        this.profile = new ProfileModel();
        this.profile.uid = user.uid;
        this.profile.displayName = user.auth.displayName;
        this.profile.providerId = user.auth.providerData[0].providerId;
        this.profile.photoUrl = user.auth.photoURL;
        let afProfile = this.af.database.object('/profile/' + this.profile.uid);
        afProfile.update(this.profile);
        console.log('profile', this.profile);
        console.log('user', user);

        // write profile information to firebase. no-op if it exists
      } else {
        // user not logged in
        this.profile = null;
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
    this.af.auth.logout();
  }
}
