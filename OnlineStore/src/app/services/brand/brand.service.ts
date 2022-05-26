import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BrandModel } from 'src/app/commun/models/brand.model';
import { environment as e } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  constructor(private https: HttpClient) { }

  public getBrand() {
    return this.https.get(e.BRAND_URL);
  }

  public getBrandById(id: string): Observable<BrandModel> {
    return this.https.get<BrandModel>(e.BRAND_URL+id).pipe(
      map(item => {
        return {
          id: item.id,
          name: item.name,
          webSite: item.webSite
        };
      })
    );
  }

  public updateBrand(id: string, name: string, webSite: string): any {
    var content = {id, name, webSite}
    return this.https.put(e.BRAND_URL, content).pipe(
      map(item => {
        return (console.log(item));
      })
    );
  }

  public deleteBrand(id: string): any{
    return this.https.delete<BrandModel>(e.BRAND_URL+id).pipe(
      map(item => {
        return (console.log(item));
      })
    );
  }

  public addBrand( name: string, webSite: string): any{
    var content = {name, webSite};
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.https.post(e.BRAND_URL, content, httpOptions).pipe(
      map(item => {
        return (console.log(item));
      })
    );
  }
}
