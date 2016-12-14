import { Component, OnInit } from '@angular/core';
import { AuthService, ProfileModel } from '../shared/';

@Component({
  selector: 'profile-root',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  profile: ProfileModel;

  constructor(public as: AuthService) { }

  ngOnInit() {
    this.as.authSubscription(this.profile, (profile: ProfileModel) => {
      this.profile = profile;
    });
  }
}
