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

    var filter = {
      categories: "",
      cards: ""
    };

    var filtersList = [];

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
          filter.categories = filter.categories.concat(category);
          isFirstLocal = false;
        } else {
          filter.categories = filter.categories.concat("|", category);
        }
      });
    } else {
      filter.categories = filter.categories.concat("*");
    }

    isFirstLocal = true;

    if (filters.cards.length != 0) {
      filters.cards.forEach(card => {
        if (isFirstLocal) {
          filter.cards = filter.cards.concat(card);
          isFirstLocal = false;
        } else {
          filter.cards = filter.cards.concat("|", card);
        }
      });
      filter.cards = filter.cards.concat("|Ambos");
    } else {
      filter.cards = filter.cards.concat("*");
    }

    if (filters.searchText != "") {
      filtersList.push({ match_phrase_prefix: { store: filters.searchText } })
    }

    filtersList.push({ simple_query_string: { fields: ["category"], query: filter.categories } });
    filtersList.push({ simple_query_string: { fields: ["cardtype"], query: filter.cards } });

    var body = {
                  query: {
                    bool: {
                      must: filtersList
                    }
                  },
                  "size": 10000
                }

    return this.http.post<any>('http://localhost:9200/' + indices + '/benefits/_search', body);
    
  }
}
