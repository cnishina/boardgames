import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { ContactsComponent,
  FeedComponent,
  SearchComponent,
  StatusComponent,
  UpdateComponent } from './feed';
import { LoginComponent } from './login';
import { ProfileComponent } from './profile';
import { AuthService } from './shared';

import { appFirebase } from './app.firebase';
import { appRoutes } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    FeedComponent,
    LoginComponent,
    ProfileComponent,
    SearchComponent,
    StatusComponent,
    UpdateComponent
  ],
  imports: [
    AngularFireModule.initializeApp(appFirebase),
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
