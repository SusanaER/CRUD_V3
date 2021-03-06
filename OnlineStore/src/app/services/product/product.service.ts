import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, catchError } from 'rxjs';
import { ProductModel } from 'src/app/commun/models/product.model';
import { environment as e } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private https: HttpClient) { }

  public getProduct() {
    return this.https.get(e.PRODUCT_URL);
  }

  public getProductById(id: string): Observable<ProductModel> {
    return this.https.get<ProductModel>(e.PRODUCT_URL+id).pipe(
      map(item => {
        return {
          id: item.id,
          name: item.name,
          description: item.description,
          image: item.image,
          precio: item.precio,
          brandId: item.brandId,
          categorysId: item.categorysId
        };
      })
    );
  }

  public updateProduct(id: string, name: string, description: string, image: string, precio: string, brandId: string, categorysId: string): any {
    var content = {id, name, description, image, precio, brandId, categorysId}
    return this.https.put(e.PRODUCT_URL, content).pipe(
      map(item => {
        return (console.log(item));
      })
    );
  }

  public deleteProduct(id: string): any{
    return this.https.delete<ProductModel>(e.PRODUCT_URL+id).pipe(
      map(item => {
        return (console.log(item));
      })
    );
  }

  public addProduct( name: string, description: string, image: string, precio: string, brandId: string, categorysId: string): any{
    var content = {name, description, image, precio, brandId, categorysId};
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.https.post(e.PRODUCT_URL, content, httpOptions).pipe(
      map(item => {
        return (console.log(item));
      })
    );
  }
}
