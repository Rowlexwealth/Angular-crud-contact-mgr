import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IContact } from 'src/model/IContact';
import { IGroup } from 'src/model/IGroup';
import { ContactService } from 'src/services/contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {
  
  myPicture = "assets/img/profile-img.jpg"

  public loading: boolean = false;
  public contact: IContact = {} as IContact;
  public group: IGroup = {} as IGroup;
  public contactId: string | null = null;
  public errorMessage: string | null = null;

  constructor(private activatedRoute: ActivatedRoute, private contactService: ContactService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param :ParamMap) => {
      this.contactId = param.get('contactId');
    });
    if(this.contactId){
      this.loading = true;
      this.contactService.getContact(this.contactId).subscribe((data: IContact) => {
        this.contact = data;
        this.loading = false;
        this.contactService.getGroup(data).subscribe((data: IGroup) => {
          this.group = data;
        });
      });
    }
  }

  public isNotEmpty(){
    return Object.keys(this.contact).length > 0 && Object.keys(this.group).length > 0;
  }
}
