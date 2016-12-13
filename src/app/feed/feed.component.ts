import { Component, Input } from '@angular/core';

import { ProfileModel } from '../shared';

@Component({
  selector: 'feed-root',
  templateUrl: './feed.component.html'
})
export class FeedComponent {
  @Input()
  profile: ProfileModel;
}
