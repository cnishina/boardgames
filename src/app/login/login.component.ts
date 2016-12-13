import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, AuthMethods, AuthProviders, FirebaseAuthState, FirebaseObjectObservable } from 'angularfire2';

import { ProfileModel } from '../shared/';

@Component({
  selector: 'login-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  profile: ProfileModel = null;
  newlyCreated: boolean = false;
  afProfile: FirebaseObjectObservable<any>;

  constructor(public af: AngularFire, public router: Router) {
    this.authSubscription();
  }

  /**
   * Check the login state of the user.
   */
  authSubscription() {
    this.af.auth.subscribe(user => {
      if (user) {
        this.profile = new ProfileModel();
        this.profile.uid = user.uid;
        this.profile.displayName = user.auth.displayName;
        this.profile.providerId = user.auth.providerData[0].providerId;
        this.profile.photoUrl = user.auth.photoURL;

        // If the user is logged in, check firebase for a profile.
        this.afProfile = this.af.database.object('/profile/' + this.profile.uid);
        this.afProfile.subscribe(subProfile => {
          console.log(subProfile);
          // If the profile does not have a screen name, it is a new account and we need
          // to set a screen name.
          if (subProfile.screenName === undefined) {
            console.log('newly created');
            this.newlyCreated = true;
            this.afProfile.update(this.profile);
          } else {
            // The profile and screen name have been completed, navigate to the feed.
            this.router.navigate(['feed']);
          }
        });
      } else {
        // The user is not logged in
        this.profile = null;
        console.log('logout');
      }
    });
  }

  /**
   * Finish up the profile by adding a screen name. Check to see the screen name is not owned.
   * Update the profile and add the screen name then navigate to the feed.
   */
  createProfile() {
    let sn = this.af.database.object('/sn/' + this.profile.screenName);
    sn.subscribe(subUid => {
      // Assign the screen name since it is not associated with a profile.
      if (subUid.uid === undefined) {
        sn.update({uid: this.profile.uid});
        this.afProfile.update(this.profile);
        this.router.navigate(['feed']);
      } else {
        // TODO(cnishina): Report an error
        this.profile.screenName = null;
      }
    });
  }

  /**
   * On login.
   */
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

  /**
   * On logout.
   */
  logout() {
    this.af.auth.logout();
  }
}
