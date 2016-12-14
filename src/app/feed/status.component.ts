import { Component, OnInit } from '@angular/core';
import { AuthService, ProfileModel } from '../shared';

@Component({
  selector: 'status-root',
  templateUrl: './status.component.html',
})
export class StatusComponent implements OnInit {
  profile: ProfileModel;

  constructor(public as: AuthService) { }

  ngOnInit() {
    this.as.authSubscription(this.profile, (profile: ProfileModel) => {
      this.profile = profile;
    });
  }
}
