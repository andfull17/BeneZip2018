import { Component, OnInit } from '@angular/core';
import { ElasticsearchService } from '../../services/elasticsearch.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  results: any[] = [];
  sidebarOpened: boolean = false;

  constructor(private elasticSearch: ElasticsearchService) { }

  ngOnInit() {
    //* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
    var dropdown = document.getElementsByClassName("dropdown-btn");
    var i;

    for (i = 0; i < dropdown.length; i++) {
      dropdown[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
          dropdownContent.style.display = "none";
        } else {
          dropdownContent.style.display = "block";
        }
      });
    }
  }

  toggleSidebar() {
    if (this.sidebarOpened) {
      document.getElementById("sidebar").style.width = "0";
      document.getElementById("principal").style.marginLeft = "0";
      this.sidebarOpened = false;
    } else {
      document.getElementById("sidebar").style.width = "250px";
      document.getElementById("principal").style.marginLeft = "250px";
      this.sidebarOpened = true;
    }
    
  }

  closeNav() {
    
  } 

  getCategoryItems(categoryName) {

    this.elasticSearch.getItems(categoryName).subscribe(data => {

      this.results = data.hits.hits;
      console.log(this.results);
    });
  }

}
