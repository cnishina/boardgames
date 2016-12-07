import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/';
import { LoginComponent } from './login/';
import { ProfileComponent } from './profile/';

import { firebaseConfig } from './app.firebase';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    LoginComponent,
    ProfileComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
