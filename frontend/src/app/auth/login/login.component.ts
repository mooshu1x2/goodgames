import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  login_url = environment.api_url + '/login';
  logout_url = environment.api_url + '/logout';

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  login(provider) {

    // google_url = 'http://localhost:8000/api/accounts/google/login/?process=login'
    this.http.get(this.login_url)
      .subscribe(
        data => {
          console.log(data);
          // this.data = data;
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('An error occurred:', err.error.message);
          } else {
            // use backticks to inline variables
            console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          }
        }
      );
  }

  logout() {
    this.http.get(this.logout_url)
      .subscribe(
        data => {
          console.log(data);
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
}
