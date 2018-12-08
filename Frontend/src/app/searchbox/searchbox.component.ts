import { Component, Input, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Options } from 'selenium-webdriver/opera';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss']
})
export class SearchboxComponent implements OnInit{
  @Input() options: string[];
  searchTerm: FormControl = new FormControl();
  searchResult: string[];

  ngOnInit(){
  }

  constructor(){
    
    this.searchTerm.valueChanges.subscribe(data =>{
      console.log(data)
      this.searchResult = this.options.filter(option => option.toLowerCase().startsWith(data.toLowerCase()));
      console.log(this.searchResult)
    })
  }
    

}
