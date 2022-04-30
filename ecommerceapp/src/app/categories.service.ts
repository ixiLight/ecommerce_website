import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';
import { Observable } from 'rxjs';
import { Categories } from './categories';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {

  private apiServerUrl = environment.categoryURL;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  public getCategory(): Observable<Categories[]> {
    return this.http.get<Categories[]>(`${this.apiServerUrl}/category/all`);
  }

  public updateCategory(category: Categories): Observable<Categories> {
    return this.http.put<Categories>(`${this.apiServerUrl}/category/update`, category);
  }

  public deleteCategory(categoryId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/category/delete/${categoryId}`);
  }

  public addCategory(category: Categories): Observable<Categories> {
    return this.http.post<Categories>(`${this.apiServerUrl}/category/add`, category);
  }

  
}


