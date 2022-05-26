import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PromotionModel } from 'src/app/commun/models/promotion.model';
import { environment as e } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  constructor(private https: HttpClient) { }

  public getPromotion() {
    return this.https.get(e.PROMOTION_URL);
  }

  public getPromotionById(id: string): Observable<PromotionModel> {
    return this.https.get<PromotionModel>(e.PROMOTION_URL+id).pipe(
      map(item => {
        return {
          id: item.id,
          productId: item.productId,
          description: item.description,
          discounts: item.discounts,
        };
      })
    );
  }

  public updatePromotion(id: string, productId: string, description: string, discounts: string): any {
    var content = {id, productId, description, discounts}
    return this.https.put(e.PROMOTION_URL, content).pipe(
      map(item => {
        return (console.log(item));
      })
    );
  }

  public deletePromotion(id: string): any{
    return this.https.delete<PromotionModel>(e.PROMOTION_URL+id).pipe(
      map(item => {
        return (console.log(item));
      })
    );
  }

  public addPromotion( productId: string, description: string, discounts: string): any{
    var content = {productId, description, discounts}
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.https.post(e.PROMOTION_URL, content, httpOptions).pipe(
      map(item => {
        return (console.log(item));
      })
    );
  }
}
