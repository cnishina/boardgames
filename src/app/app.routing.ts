import { Routes } from '@angular/router';

import { FeedComponent } from './feed';
import { LoginComponent } from './login';
import { ProfileComponent } from './profile';
import { SearchComponent } from './search';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'search', component: SearchComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full'},
];
