import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class GamesComponent implements OnInit {
  api_url = environment.api_url + '/games';
  data: any = {};

  constructor(private http: Http) {
    console.log('Hello World!');
    this.getGames();
    this.getData();
  }

  getData() {
    return this.http.get(this.api_url)
      .map((res) => res.json());
  }

  getGames() {
    this.getData().subscribe(data => {
      console.log(data);
      this.data = data;
    });
  }

  ngOnInit() {
  }

}
