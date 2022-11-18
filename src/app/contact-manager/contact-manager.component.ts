import { Component, OnInit } from '@angular/core';
import { IContact } from './../../model/IContact';
import { ContactService } from './../../services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {

  myPicture: string = "assets/img/profile-img.jpg"

  public loading: boolean = false;
  public contacts: IContact[] = [];
  public errorMessage: string | null = null;

  constructor(private ContactService : ContactService) { }

  ngOnInit(): void {
    this.getAllContactsFromServer();
  }

  public getAllContactsFromServer(){
    this.loading = true;
    this.ContactService.getAllContacts().subscribe((data:IContact[]): void => {
      this.contacts = data;
      this.loading = false;
    });
  }

  public clickDeleteContact(contactId: string | undefined){
    if(contactId){
      this.ContactService.deleteContact(contactId).subscribe((data: {}) => {
        this.getAllContactsFromServer();
      })
    }
  }
}


