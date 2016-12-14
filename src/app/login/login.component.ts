import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2';
import { AuthService, ProfileModel } from '../shared/';

@Component({
  selector: 'login-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  profile: ProfileModel;
  newlyCreated: boolean = false;

  constructor(public as: AuthService, public af: AngularFire, public router: Router) { }

  ngOnInit() {
    this.as.authSubscription(this.profile, (profile: ProfileModel) => {
      this.profile = profile;
      if (this.profile.screenName === undefined) {
        this.newlyCreated = true;
      } else {
        this.router.navigate(['feed']);
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
        this.af.database.object('/profile/' + this.profile.uid).update(this.profile);
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
