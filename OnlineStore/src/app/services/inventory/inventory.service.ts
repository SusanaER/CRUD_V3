import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment as e } from '../../../environments/environment';
import {InventoryModel} from '../../commun/models/inventory.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  constructor(private https: HttpClient) { }

  public getInventory() {
    return this.https.get(e.INVENTORY_URL);
  }

  public getInventoryById(id: string): Observable<InventoryModel> {
    return this.https.get<InventoryModel>(e.INVENTORY_URL+id).pipe(
      map(item => {
        return {
          id: item.id,
          productId: item.productId,
          quantity: item.quantity,
        };
      })
    );
  }

  public updateInventory(id: string, productId: string, quantity: string): any {
    var content = {id, productId, quantity}
    return this.https.put(e.INVENTORY_URL, content).pipe(
      map(item => {
        return (console.log(item));
      })
    );
  }

  public deleteInventory(id: string): any{
    return this.https.delete<InventoryModel>(e.INVENTORY_URL+id).pipe(
      map(item => {
        return (console.log(item));
      })
    );
  }

  public addInventory( productId: string, quantity: string): any{
    var content = {productId, quantity}
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.https.post(e.INVENTORY_URL, content, httpOptions).pipe(
      map(item => {
        return (console.log(item));
      })
    );
  }
}
