import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElasticsearchService {

  constructor(private http: HttpClient) { }

  getItems(categoryName: string): Observable<any> {

    return this.http.get<any>('http://localhost:9200/_all/benefits/_search?q=category:' + categoryName + '&size=1000');
  }
}
