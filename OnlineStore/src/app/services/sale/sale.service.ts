import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SaleModel } from 'src/app/commun/models/sale.model';
import { environment as e } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  constructor(private https: HttpClient) { }

  public getSale() {
    return this.https.get(e.SALE_URL);
  }

  public getSaleById(id: string): Observable<SaleModel> {
    return this.https.get<SaleModel>(e.SALE_URL+id).pipe(
      map(item => {
        return {
          id: item.id,
          clientId: item.clientId,
          saleDate: item.saleDate,
          producId: item.producId,
        };
      })
    );
  }

  public updateSale(id: string, clientId: string, saleDate: string, producId: string): any {
    var content = {id, clientId, saleDate, producId}
    return this.https.put(e.SALE_URL, content).pipe(
      map(item => {
        return (console.log(item));
      })
    );
  }

  public deleteSale(id: string): any{
    return this.https.delete<SaleModel>(e.SALE_URL+id).pipe(
      map(item => {
        return (console.log(item));
      })
    );
  }

  public addSale(clientId: string, saleDate: string, producId: string): any{
    var content = {clientId, saleDate, producId}
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.https.post(e.SALE_URL, content, httpOptions).pipe(
      map(item => {
        return (console.log(item));
      })
    );
  }
}
