import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CategoryModel } from 'src/app/commun/models/category.model';
import { environment as e } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private https: HttpClient) { }

  public getCategory() {
    return this.https.get(e.CATEGORY_URL);
  }

  public getCategoryById(id: string): Observable<CategoryModel> {
    return this.https.get<CategoryModel>(e.CATEGORY_URL+id).pipe(
      map(item => {
        return {
          id: item.id,
          name: item.name,
        };
      })
    );
  }

  public updateCategory(id: string, name: string): any {
    var content = {id, name}
    return this.https.put(e.CATEGORY_URL, content).pipe(
      map(item => {
        return (console.log(item));
      })
    );
  }

  public deleteCategory(id: string): any{
    return this.https.delete<CategoryModel>(e.CATEGORY_URL+id).pipe(
      map(item => {
        return (console.log(item));
      })
    );
  }

  public addCategory( name: string): any{
    var content = {name};
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.https.post(e.CATEGORY_URL, content, httpOptions).pipe(
      map(item => {
        return (console.log(item));
      })
    );
  }
}
