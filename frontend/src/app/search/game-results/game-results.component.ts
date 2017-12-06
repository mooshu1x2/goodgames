import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {GameService} from '../../games/shared/game.service';
import {Game} from '../../games/shared/game';

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GameResultsComponent implements OnInit {

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
