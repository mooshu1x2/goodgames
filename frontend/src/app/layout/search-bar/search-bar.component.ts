import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchBarComponent implements OnInit {

  api_url = environment.api_url + '/games/choices';
  data: any = {};

  constructor(private http: Http) {
    this.getChoices();
    this.getData();
  }

  getData() {
    return this.http.get(this.api_url)
      .map((res) => res.json());
  }

  getChoices() {
    this.getData().subscribe(data => {
      console.log(data);
      this.data = data;
    });
  }

  ngOnInit() {
  }

}
