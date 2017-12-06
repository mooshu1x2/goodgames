import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchBarComponent implements OnInit {

  api_url = environment.api_url + '/games/choices/';
  data: any = {};

  constructor(private http: HttpClient) {
  }

  getData() {
    return this.http.get(this.api_url);
  }

  getChoices() {
    this.getData().subscribe(data => {
      console.log(data);
      this.data = data;
    });
  }

  ngOnInit() {
    this.getChoices();
    this.getData();
  }

}
