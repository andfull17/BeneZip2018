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

  onItemSelect(item: any) {
    console.log(item);
  }

  onSelectAll(items: any) {
    console.log(items);
  }

  getCategoryItems(categoryName) {

    this.elasticSearch.getItems(categoryName).subscribe(data => {

      this.results = data.hits.hits;
      console.log(this.results);
    });
  }

}
