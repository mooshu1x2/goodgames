import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/retry';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class GamesComponent implements OnInit {
  api_url = environment.api_url + '/games';
  data: any = {};

  constructor(private http: HttpClient) {
    console.log('Hello World!');
    this.getGames();
    this.getData();
  }

  getData() {
    return this.http.get(this.api_url);
  }

  getGames() {
    this.getData()
      // Retry request 3 times
      .retry(3)
      .subscribe(
        data => {
          console.log(data);
          this.data = data;
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('An error occurred:', err.error.message);
          } else {
            console.log('Backend returned code ${err.status}, body was: ${err.error}');
          }
        }
      );
  }

  ngOnInit() {
  }

}
