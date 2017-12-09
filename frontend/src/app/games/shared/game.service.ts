import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import {Game, Comment} from './game';

@Injectable()
export class GameService {
  private headers: HttpHeaders;
  private gamesUrl: string;

  // private handleError(operation = 'operation', error: any) {
  //   if (error instanceof Error) {
  //     console.log('An error occurred:', error.message);
  //   }
  //   console.log(`Backend returned code ${error.status}, body was: ${error.message}`);
  // }
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
    this.gamesUrl = environment.api_url + '/games';
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});
  }

  /**
   * Retrieve all Games
   * @returns {Subscription}
   */
  getAllGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.gamesUrl).pipe(
      tap(games  => console.log(`fetched all games`)),
      catchError(this.handleError('getGames', []))
    );
  }

  /**
   * Retrieve a Game by Id
   * @param {number} gameId
   * @returns {Subscription}
   */
  getGameById(gameId: number): Observable<Game> {
    return this.http.get<Game>(this.gamesUrl + gameId).pipe(
      tap(_ => console.log(`fetched game id=${gameId}`)),
      catchError(this.handleError<Game>(`getHero id=${gameId}`))
    );
  }

  /**
   * Retrieve a Game's user or critic reviews
   * @param {number} gameId
   * @param {string} type
   * @returns {Subscription}
   */
  getGameComments(gameId: number, type: string) {
    // const url = `${this.gamesUrl}/${gameId}/reviews/${type}/`;
    const url = `${this.gamesUrl}${gameId}/reviews/critic`;

    return this.http.get<any>(url).pipe(
      tap(comments => console.log(`fetched game comments id=${gameId}`)),
      catchError(this.handleError<Game>(`getGameComments id=${gameId}`))
    );
  }

  /**
   * Like a Game
   * @param {Game} game
   * @returns {any}
   */
  like(game: Game) {
    const url = `${this.gamesUrl}/${game.id}/like`;
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`like game id=${game.id}`)),
      catchError(this.handleError<Game>(`like id=${game.id}`))
    );
  }

  /**
   * GET games whose name contains the search term
   * @param {string} term
   * @returns {Observable<Game[]>}
   */
  searchGames(term: string): Observable<Game[]> {
    if (!term.trim()) {
      // if not search term, return empty game array.
      return of([]);
    }
    const url = `${this.gamesUrl}/search/${term}`
    return this.http.get<Game[]>(url).pipe(
      tap(_ => console.log(`found games matching "${term}"`)),
      catchError(this.handleError<Game[]>('searchGames', []))
    );
  }

  /**
   * Filter games on value
   * @param {string} field
   * @param {string} value
   * @returns {Observable<Game[]>}
   */
  filterGames(field: string, value: string): Observable<Game[]> {
    const url = `${this.gamesUrl}/${field}/${value}`;
    console.log('url is = ' + url);
    return this.http.get<Game[]>(url).pipe(
      tap(_ => console.log(`found games matching "${field}" of type "${value}"`)),
      catchError(this.handleError<Game[]>('filterGames', []))
    );
  }
}
