import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

import {environment} from '../../environments/environment';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { User} from './user';

@Injectable()
export class UserService {
  private headers: HttpHeaders;
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

  constructor(private http: HttpClient) {
    this.authUrl = environment.api_url + '/auth';
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});
  }

  /**
   * Retrieve all Games
   * @returns {Subscription}
   */
  // login(user: User): Observable<boolean> {
  //   return this.http.get(this.authUrl).pipe(
  //     tap(_  => console.log(`fetched game id=${user.id}`)),
  //     catchError(this.handleError('login'))
  //   );
  // }

}
