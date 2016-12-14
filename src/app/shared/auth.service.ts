import { Injectable } from '@angular/core';

import { AngularFire } from 'angularfire2';
import { ProfileModel } from './profile.model';

@Injectable()
export class AuthService {

  constructor(public af: AngularFire) { }

  /**
   * Check the login state of the user.
   */
  authSubscription(profile: ProfileModel, callback: Function) {
    this.af.auth.subscribe(user => {
      if (user) {
        profile = new ProfileModel();
        profile.uid = user.uid;
        profile.displayName = user.auth.displayName;
        profile.providerId = user.auth.providerData[0].providerId;
        profile.photoUrl = user.auth.photoURL;

        // If the user is logged in, check firebase for a profile.
        let afProfile = this.af.database.object('/profile/' + profile.uid);
        afProfile.subscribe(subProfile => {
          console.log(subProfile);
          // If the profile does not have a screen name, it is a new account and we need
          // to set a screen name.
          if (subProfile.screenName === undefined) {
            console.log('newly created');
            afProfile.update(profile);
          } else {
            // The profile and screen name have been completed, do the callback
            profile.screenName = subProfile.screenName;
            callback(profile);
          }
        });
      } else {
        // The user is not logged in
        profile = null;
        console.log('logout');
      }
    });
  }
}
