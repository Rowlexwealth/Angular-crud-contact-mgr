import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { IContact } from 'src/model/IContact';
import { IGroup } from 'src/model/IGroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private serverUrl: string = 'http://localhost:9000'; //json-server url

  constructor(private httpClient: HttpClient) { }

  // GET ALL CONTACT
  public getAllContacts(): Observable<IContact[]> {
    let dataURL: string = `${this.serverUrl}/contacts`;
    return this.httpClient.get<IContact[]>(dataURL).pipe();
  }

  // GET Single Contact
  public getContact(contactId: string): Observable<IContact> {
    let dataURL: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.get<IContact>(dataURL).pipe();
  } 

  // Create a Contact
  public createContact(contact: IContact): Observable<IContact> {
    let dataURL: string = `${this.serverUrl}/contacts`;
    return this.httpClient.post<IContact>(dataURL, contact).pipe();
  }

  // Update a Contact
  public updateContact(contact: IContact, contactId: string): Observable<IContact> {
    let dataURL: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.put<IContact>(dataURL, contact).pipe();
  }

  // Delete a Contact
  public deleteContact(contactId: string): Observable<{}> {
    let dataURL: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.delete<{}>(dataURL).pipe();
  }

  // GET ALL GROUPS
  public getAllGroups(): Observable<IGroup[]> {
    let dataURL: string = `${this.serverUrl}/groups`;
    return this.httpClient.get<IContact[]>(dataURL).pipe();
  }

  // GET Single Group
  public getGroup(contact: IContact): Observable<IGroup> {
    let dataURL: string = `${this.serverUrl}/groups/${contact.groupId}`;
    return this.httpClient.get<IContact>(dataURL).pipe();
  }

  // Error handling
  public handleError(error: HttpErrorResponse){
    let errorMessage: string = '';
    if (error.error instanceof ErrorEvent) {
      //clien Error
      errorMessage = `Error : ${error.error.message}`
    }
    else{
      //server error
      errorMessage = `Status : ${error.status} \n Message : ${error.message}`;
    }
    return thrownError(errorMessage);
  }
}


function thrownError(errorMessage: string) {
  throw new Error('Function not implemented.');
}
 