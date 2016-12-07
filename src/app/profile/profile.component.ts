import { Component, Input } from '@angular/core';
import { ProfileModel } from '../shared/';

@Component({
  selector: 'profile-root',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  @Input()
  profile: ProfileModel;
}
