import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

import {Game} from '../shared/game';
import {GameService} from '../shared/game.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GameListComponent implements OnInit {
  games: Game[];

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.getGames();
  }

  getGames(): void {
    this.gameService.getAllGames()
      .subscribe(games => this.games = games);
  }
}
