import { Routes } from '@angular/router';

import { FeedComponent } from './feed';
import { LoginComponent } from './login';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'feed', component: FeedComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full'},
];
