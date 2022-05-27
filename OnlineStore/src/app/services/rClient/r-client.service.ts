import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RClientModel } from 'src/app/commun/models/rClient.model';
import { environment as e } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RClientService {
  constructor(private https: HttpClient) { }

  public getClient() {
    return this.https.get(e.REGULARCLIENT_URL);
  }

  public getClientById(id: string): Observable<RClientModel> {
    return this.https.get<RClientModel>(e.REGULARCLIENT_URL+id).pipe(
      map(item => {
        return {
          id: item.id,
          firstName: item.firstName,
          lastName: item.lastName,
          dateOfBirth: item.dateOfBirth,
          address: item.address,
          postalCode: item.postalCode,
          phoneNumber: item.phoneNumber
        };
      })
    );
  }

  public updateClient(id: string, firstName: string, lastName: string, dateOfBirth: string, address: string, postalCode: string, phoneNumber: string): any {
    var content = {id, firstName, lastName, dateOfBirth, address, postalCode, phoneNumber}
    return this.https.put(e.REGULARCLIENT_URL, content).pipe(
      map(item => {
        return (console.log(item));
      })
    );
  }

  public deleteClient(id: string): any{
    return this.https.delete<RClientModel>(e.REGULARCLIENT_URL+id).pipe(
      map(item => {
        return (console.log(item));
      })
    );
  }

  public addClient( firstName: string, lastName: string, dateOfBirth: string, address: string, postalCode: string, phoneNumber: string): any{
    var content = {firstName, lastName, dateOfBirth, address, postalCode, phoneNumber}
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.https.post(e.REGULARCLIENT_URL, content, httpOptions).pipe(
      map(item => {
        return (console.log(item));
      })
    );
  }
}
