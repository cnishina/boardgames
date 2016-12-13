import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/';
import { FeedComponent } from './feed';
import { LoginComponent } from './login/';
import { ProfileComponent } from './profile/';
import { SearchComponent } from './search';

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
  ],
  imports: [
    AngularFireModule.initializeApp(appFirebase),
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
