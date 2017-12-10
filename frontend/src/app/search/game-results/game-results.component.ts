import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import {GameService} from '../../games/shared/game.service';
import {Game} from '../../games/shared/game';

import {ActivatedRoute} from '@angular/router';
import {StorageService} from '../../storage.service';

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GameResultsComponent implements OnInit, AfterViewInit {
  games: Game[];
  private sub: any;
  options: string[];
  selectOptions = '';

  constructor(private gameService: GameService, private storageService: StorageService, private route: ActivatedRoute) {
    this.options = ['HAVE PLAYED', 'WANT TO PLAY', 'NEVER', 'CURRENTLY PLAYING'];
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
        const field = params['field'];
        const id = params['id'];
        const term = params['term'];
        if (field) {
          this.searchByField(field, id);
        } else {
          this.searchByQuery(term);
        }
    });
  }

  ngAfterViewInit() {
  }

  getGames(): void {
    this.gameService.getAllGames()
      .subscribe(games => this.games = games);
  }

  searchByQuery(term: string) {
    this.gameService.searchGames(term)
      .subscribe(games => this.games = games);
  }

  searchByField(field: string, value: string) {
    this.gameService.filterGames(field, value)
      .subscribe(games => this.games = games);
  }

  selected(event, game) {
    const state = event.target.value;
    const user = this.storageService.getData('userKey');
    this.gameService.addGame(user, game, state);
  }

}
