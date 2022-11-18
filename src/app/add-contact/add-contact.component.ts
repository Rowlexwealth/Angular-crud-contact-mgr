import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IContact } from 'src/model/IContact';
import { IGroup } from 'src/model/IGroup';
import { ContactService } from 'src/services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  myPicture: string = "assets/img/profile-img.jpg"
  public loading: boolean = false;
  public contact: IContact = {} as IContact;
  public errorMessage: string | null = null;
  public groups: IGroup[] = [] as IGroup[];

  constructor(private contactService: ContactService, private router : Router) { }

  ngOnInit(): void {
    this.contactService.getAllGroups().subscribe((data :IGroup[]) => {
      this.groups = data;
    });
  }

  public createSubmit() {
    this.contactService.createContact(this.contact).subscribe((data: IContact) => {
      this.router.navigate(['/']).then();
    })
  }
}
