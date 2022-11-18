import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IGroup } from 'src/model/IGroup';
import { ContactService } from 'src/services/contact.service';
import { IContact } from './../../model/IContact';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  myPicture: string = "assets/img/profile-img.jpg"

  public loading: boolean = false;
  public contactId: string | null = null;
  public contact: IContact = {} as IContact;
  public errorMessage: string | null = null;
  public groups: IGroup[] = [] as IGroup[];

  constructor(private activatedRoute: ActivatedRoute,
              private contactService: ContactService, 
              private router : Router) { }

  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.paramMap.subscribe((param : ParamMap) => {
      this.contactId = param.get('contactId');
    });
    if(this.contactId){
      this.contactService.getContact(this.contactId).subscribe((data: IContact) => {
        this.contact = data;
        this.loading = false;
        this.contactService.getAllGroups().subscribe((data: IGroup[]) => {
          this.groups = data;
        })
      });
    }
  }

  public submitUpdate() {
    if(this.contactId){
      this.contactService.updateContact(this.contact, this.contactId).subscribe((data: IContact) => {
        this.router.navigate(['/']).then();
      });
    }
  }
}
