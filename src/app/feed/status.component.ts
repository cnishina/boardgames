import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { AuthService, ProfileModel } from '../shared';

@Component({
  selector: 'status-root',
  templateUrl: './status.component.html',
})
export class StatusComponent implements OnInit {
  profile: ProfileModel;
  statusList: any[];

  constructor(public af: AngularFire, public as: AuthService) { }

  ngOnInit() {
    this.as.authSubscription(this.profile, (profile: ProfileModel) => {
      this.profile = profile;
      this.subscribeStatus();
    });
  }

  subscribeStatus() {
    this.af.database.list('/status/' + this.profile.uid,
    {query: { limitToLast: 10 }}).subscribe(list => {
      this.statusList = list.reverse();
    });
  }
}
