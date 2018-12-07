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

  getFilteredItems(filters: any): Observable<any> {

    var filter: string = "";
    var indices: string = "";

    var isFirstGlobal = true;
    var isFirstLocal = true;

    if (filters.banks.length != 0) {
      filters.banks.forEach(bank => {
        if (isFirstLocal) {
          indices = indices.concat(bank.toLowerCase());
          isFirstLocal = false;
        } else {
          indices = indices.concat(",", bank.toLowerCase());
        }
      });
    } else {
      indices = indices.concat("_all")
    }

    var isFirstLocal = true;

    if (filters.categories.length != 0) {
      filters.categories.forEach(category => {
        if (isFirstLocal) {
          filter = filter.concat("q=category:", category);
          isFirstLocal = false;
          isFirstGlobal = false;
        } else {
          filter = filter.concat(",", category);
        }
      });
    }

    isFirstLocal = true;

    if (filters.cards.length != 0) {
      filters.cards.forEach(card => {
        if (isFirstLocal) {
          if (isFirstGlobal) {
            filter = filter.concat("q=cardtype:", card);
            isFirstGlobal = false;
          } else {
            filter = filter.concat("&q=cardtype:", card);
          }
          isFirstLocal = false;
        } else {
          filter = filter.concat(",", card);
        }
      });
    }

    //if (filters.searchText != "") {
      //filter.concat("q=store:", filters.searchText) esto tiene q ser partial march
    //}

    return this.http.get<any>('http://localhost:9200/' + indices + '/benefits/_search?' + filter + '&size=1000');
    
  }
}
