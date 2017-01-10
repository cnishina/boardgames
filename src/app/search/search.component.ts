import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { AuthService, ProfileModel } from '../shared/';

@Component({
  selector: 'search-root',
  templateUrl: './search.component.html',
  styleUrls: ['./feed.common.css'],
})
export class SearchComponent implements OnInit{
  profile: ProfileModel;
  searchProfile: ProfileModel;
  query: string;

  constructor(public af: AngularFire, public as: AuthService, public router: Router) { }

  ngOnInit() {
    this.as.authSubscription(this.profile, (profile: ProfileModel) => {
      this.profile = profile;
    });
  }

  search() {
    this.af.database.object('/sn/' + this.query).subscribe(sn => {
      console.log(sn);
      this.af.database.object('/profile/' + sn.uid).subscribe(profile => {
        console.log(profile);
        this.searchProfile = profile;
      });
    });
  }

  clear() {
    this.searchProfile = null;
    this.query = null;
  }

  addFriend() {
    if (this.profile.uid === this.searchProfile.uid) {
      console.log('???');
      return;
    }
    let obj: any = {};
    obj[this.searchProfile.uid] = {
      displayName: this.searchProfile.displayName,
      photoUrl: this.searchProfile.photoUrl,
      screenName: this.searchProfile.screenName
    };
    this.af.database.object('/contacts/' + this.profile.uid).update(obj);
  }
}