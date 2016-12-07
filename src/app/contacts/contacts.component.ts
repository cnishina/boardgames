import { Component, Input, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { ContactModel, ProfileModel } from '../shared/';

@Component({
  selector: 'contacts-root',
  templateUrl: './contacts.component.html',
})
export class ContactsComponent implements OnInit {
  @Input()
  profile: ProfileModel;
  contacts: ContactModel[] = null;

  constructor(public af: AngularFire) { }

  ngOnInit() {
    this.af.database.object('/contacts/' + this.profile.uid).subscribe(contacts => {
      if (contacts) {
        for (let key of Object.keys(contacts)) {
          // ignore extra firebase stuff
          if (key !== '$key' && key !== '$exists' && key !== '$value') {
            if (this.contacts == null) {
              this.contacts = [];
            }
            let contact = contacts[key] as ContactModel;
            this.contacts.push(contact);
          }
        }
      } else {
        this.contacts = null;
      }
    });
  }
}
