import { Routes } from '@angular/router';

import { FeedComponent } from './feed';
import { LoginComponent } from './login';
import { SearchComponent } from './search';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'search', component: SearchComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full'},
];
