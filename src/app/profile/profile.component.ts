import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { AuthService, ProfileModel } from '../shared/';

@Component({
  selector: 'profile-root',
  templateUrl: './profile.component.html',
  styleUrls: [
    './profile.component.css',
  ],
})
export class ProfileComponent implements OnInit {
  profile: ProfileModel;

  constructor(public af: AngularFire, public as: AuthService, public router: Router) { }

  ngOnInit() {
    this.as.authSubscription(this.profile, (profile: ProfileModel) => {
      this.profile = profile;
    });
  }

  /**
   * On logout.
   */
  logout() {
    this.af.auth.logout();
    this.router.navigate(['login']);
  }
}
