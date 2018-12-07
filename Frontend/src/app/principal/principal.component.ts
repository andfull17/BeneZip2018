import { Component, OnInit } from '@angular/core';
import { ElasticsearchService } from '../../services/elasticsearch.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  results: any[] = [];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  filters = {
    categories: [],
    banks: [],
    cards: [],
    searchText: ""    
  };
  sortSettings = {};

  //para realizar consulta a elasticsearch:
  selectedCategory: string;
  selectedCard: string;
  other: string; //texto libre

  constructor(private elasticSearch: ElasticsearchService) { }

  ngOnInit() {

    this.getCategoryItems('*');

    this.dropdownList = [
      { item_id: 1, item_text: 'Hogar'},
      { item_id: 2, item_text: 'Gastronomía' },
      { item_id: 3, item_text: 'Enseñanza' },
      { item_id: 4, item_text: 'Salud' },
      { item_id: 5, item_text: 'Tecnología' },
      { item_id: 6, item_text: 'Vestimenta' },
      { item_id: 7, item_text: 'Transporte' },
      { item_id: 8, item_text: 'Estética' },
      { item_id: 9, item_text: 'Turismo' }
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Todos',
      unSelectAllText: 'Ninguno',
      itemsShowLimit: 2,
      allowSearchFilter: true,
      searchPlaceholderText: 'Buscar'
    };

    this.sortSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      itemsShowLimit: 2
    };
  }

  onItemSelectCategory(item: any) {
    var category: string = item.item_text;
    var i: number = this.filters.categories.indexOf(category);
    if(i >= 0){
      this.filters.categories.splice(i,1);
    }
    else{
      this.filters.categories.push(category);
    }
  }

  onItemDeSelectCategory(item: any) {
    var category: string = item.item_text;
    var i: number = this.filters.categories.indexOf(category);
    if(i >= 0){
      this.filters.categories.splice(i,1);
    }
    else{
      console.log('Item no estaba guardado')
    }
  }

  onItemSelectBank(item: any) {
    var bank: string = item.item_text;
    var i: number = this.filters.banks.indexOf(bank);
    if(i >= 0){
      this.filters.banks.splice(i,1);
    }
    else{
      this.filters.banks.push(bank);
    }
  }

  onItemDeSelectBank(item: any) {
    var bank: string = item.item_text;
    var i: number = this.filters.banks.indexOf(bank);
    if(i >= 0){
      this.filters.banks.splice(i,1);
    }
    else{
      console.log('Item no estaba guardado')
    }
  }

  onItemSelectCard(item: any) {
    var card: string = item.item_text;
    var i: number = this.filters.cards.indexOf(card);
    if(i >= 0){
      this.filters.cards.splice(i,1);
    }
    else{
      this.filters.cards.push(card);
    }
  }

  onItemDeSelectCard(item: any) {
    var card: string = item.item_text;
    var i: number = this.filters.cards.indexOf(card);
    if(i >= 0){
      this.filters.cards.splice(i,1);
    }
    else{
      console.log('Item no estaba guardado')
    }
  }

  onSelectAllCategories(items: any) {
    this.filters.categories = [];
    items.forEach(element => {
      this.filters.categories.push(element.item_text);
    });
  }

  onDeSelectAllCategories(items: any) {
    this.filters.categories = [];
  }

  onSelectAllCards(items: any) {
    this.filters.cards = [];
    items.forEach(element => {
      this.filters.cards.push(element.item_text);
    });
  }

  onDeSelectAllCards(items: any) {
    this.filters.cards = [];
  }

  onSelectAllBanks(items: any) {
    this.filters.banks = [];
    items.forEach(element => {
      this.filters.banks.push(element.item_text);
    });
  }

  onDeSelectAllBanks(items: any) {
    this.filters.banks = [];
  }

  onItemSelectSort(item: any) {

    switch (item.item_text) {

      case "A-Z":

        this.results.sort(function (a, b) {
          return a._source.store.localeCompare(b._source.store);
        })
        break;

      case "Z-A":

        this.results.sort(function (a, b) {
          return b._source.store.localeCompare(a._source.store);
        })
        break;

    }
  }

  search() {
    this.filters.searchText = (<HTMLInputElement>document.getElementById("searchbox")).value;
    console.log(this.filters)
    this.elasticSearch.getFilteredItems(this.filters).subscribe(data => {

      this.results = data.hits.hits;
      //console.log(this.results);
    });
    //llamar a elasticsearch
  }

  getCategoryItems(categoryName) {

    this.elasticSearch.getItems(categoryName).subscribe(data => {

      this.results = data.hits.hits;
      //console.log(this.results);
    });
  }

}
