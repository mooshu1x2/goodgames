import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
// import 'rxjs/add/operator/map';

import {environment} from '../../environments/environment';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import { User} from './user';

import {StorageService} from '../storage.service';

@Injectable()
export class UserService {
  private headers: HttpHeaders;
  private options: any;
  private authUrl: string;

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(private http: HttpClient, private storageService: StorageService) {
    this.authUrl = environment.api_url + '/auth';
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.options = {
      headers: this.headers
    };
  }

  /**
   * Just login
   * @returns {Subscription}
   */
  login() {
    const user = this.storageService.getData('userKey');
    const url = `${this.authUrl}/sociallogin`;
    this.http.post(url, user, this.options) // ...using post request
      .map(res => console.log(res)) // ...and calling .json() on the response to return data
      .catch(err  => {
        console.log(err);
        return Observable.throw(err);
      })
      .subscribe();
  }

  logout(): Observable<any> {
    const url = `${this.authUrl}/logout`;
    const user = this.storageService.getData('userKey');
    return this.http.get(url).pipe(
      tap(_  => console.log(`logged out ${user.id}`)),
      catchError(this.handleError('login'))
    );
  }
}
