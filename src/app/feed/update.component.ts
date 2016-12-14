import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { AuthService, ProfileModel, StatusModel } from '../shared';

@Component({
  selector: 'update-root',
  templateUrl: './update.component.html',
})
export class UpdateComponent implements OnInit {
  profile: ProfileModel;
  status: StatusModel;
  textData: string;

  constructor(public af: AngularFire, public as: AuthService) { }

  ngOnInit() {
    this.as.authSubscription(this.profile, (profile: ProfileModel) => {
      this.profile = profile;
    });
  }

  updateStatus() {
    this.status = new StatusModel();
    this.status.text = this.textData;
    this.status.postedBy = this.profile.uid;
    this.af.database.object('/status/' + this.profile.uid + '/' + this.status.timestamp).update(this.status);
    this.textData = '';
  }
}
