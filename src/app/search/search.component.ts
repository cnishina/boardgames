import { Component, Input } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { ProfileModel } from '../shared/';

@Component({
  selector: 'search-root',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  query: string;
  searchResults: any[] = null;
  @Input()
  profile: ProfileModel;

  constructor(public af: AngularFire) { }

  onSearch() {
    this.af.database.list('/contacts/' + this.profile.uid).subscribe(items => {
      console.log('search_', items);
      for (let key of Object.keys(items)) {
        // ignore extra firebase stuff
        if (key.charAt(0) !== '$') {
          if (this.searchResults == null) {
            this.searchResults = [];
          }
          // do something
          if (items[key].displayName.indexOf(this.query) >= 0) {
            this.searchResults.push(items[key]);
          }
        }
      }
      console.log('results_', this.searchResults);
    });
  }
}
