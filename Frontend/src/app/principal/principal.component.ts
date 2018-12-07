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
    cards: []
  };

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
      allowSearchFilter: true
    };
  }

  onItemSelectCategory(item: any) {
    var category: string = item.item_text;
    var i: number = this.filters.categories.indexOf(category);
    if(i >= 0){
      this.filters.categories.splice(i);
    }
    else{
      this.filters.categories.push(category);
    }
  }

  onItemDeSelectCategory(item: any) {
    var card: string = item.item_text;
    var i: number = this.filters.categories.indexOf(card);
    if(i >= 0){
      this.filters.categories.splice(i);
    }
    else{
      console.log('Item no estaba guardado')
    }
  }

  onItemSelectBank(item: any) {
    var bank: string = item.item_text;
    var i: number = this.filters.banks.indexOf(bank);
    if(i >= 0){
      this.filters.banks.splice(i);
    }
    else{
      this.filters.banks.push(bank);
    }
  }

  onItemDeSelectBank(item: any) {
    var card: string = item.item_text;
    var i: number = this.filters.banks.indexOf(card);
    if(i >= 0){
      this.filters.banks.splice(i);
    }
    else{
      console.log('Item no estaba guardado')
    }
  }

  onItemSelectCard(item: any) {
    var card: string = item.item_text;
    var i: number = this.filters.cards.indexOf(card);
    if(i >= 0){
      this.filters.cards.splice(i);
    }
    else{
      this.filters.cards.push(card);
    }
  }

  onItemDeSelectCard(item: any) {
    var card: string = item.item_text;
    var i: number = this.filters.cards.indexOf(card);
    if(i >= 0){
      this.filters.cards.splice(i);
    }
    else{
      console.log('Item no estaba guardado')
    }
  }

  onSelectAllCategories(items: any) {
    items.forEach(element => {
      this.filters.categories.push(element.item_text);
    });
  }

  onDeSelectAllCategories(items: any) {
    this.filters.categories = [];
  }

  onSelectAllCards(items: any) {
    items.forEach(element => {
      this.filters.cards.push(element.item_text);
    });
  }

  onDeSelectAllCards(items: any) {
    this.filters.cards = [];
  }

  onSelectAllBanks(items: any) {
    items.forEach(element => {
      this.filters.banks.push(element.item_text);
    });
  }

  onDeSelectAllBanks(items: any) {
    this.filters.banks = [];
  }

  search(){
    console.log(this.filters)
    //llamar a elasticsearch
  }

  getCategoryItems(categoryName) {

    this.elasticSearch.getItems(categoryName).subscribe(data => {

      this.results = data.hits.hits;
      //console.log(this.results);
    });
  }

}
