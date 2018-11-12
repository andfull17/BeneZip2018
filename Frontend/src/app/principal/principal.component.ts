import { Component, OnInit } from '@angular/core';
import { ElasticsearchService } from '../../services/elasticsearch.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  results: any[] = [];

  constructor(private elasticSearch: ElasticsearchService) { }

  ngOnInit() {
  }


  getCategoryItems(categoryName) {

    this.elasticSearch.getItems(categoryName).subscribe(data => {

      this.results = data.hits.hits;
      console.log(this.results);
    });
  }

}
