import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

/**
 * The main app component.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    './shared/common.css'
  ],
})
export class AppComponent {
  title = 'boardgames!';
  searchUser: string = '';

  constructor(public router: Router) { }

  search() {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'screenname': this.searchUser },
    }
    this.router.navigate(['search'], navigationExtras);
  }
}
