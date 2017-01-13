import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

import 'rxjs/add/operator/map';

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
export class AppComponent implements OnInit {
  title = 'boardgames!';
  query: string = '';

  constructor(public router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    let routeParam = this.route.queryParams.map(params => params['screenname']);
    routeParam.subscribe(query => {
      this.query = query;
    });
  }

  search() {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'screenname': this.query },
    }
    this.router.navigate(['search'], navigationExtras);
  }
}
