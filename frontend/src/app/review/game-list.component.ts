import {Component, OnInit, ViewEncapsulation, Input, EventEmitter} from '@angular/core';

import {Game} from '../games/shared/game';
import {GameService} from '../games/shared/game.service';
import {StorageService} from '../storage.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GameListComponent implements OnInit {
  games: Game[];
  selectOptions = '';
  options: string[];
  data: any[];

  constructor(private gameService: GameService, private storageService: StorageService) {
    this.options = ['HAVE PLAYED', 'WANT TO PLAY', 'NEVER', 'CURRENTLY PLAYING'];
  }

  ngOnInit() {
    this.getGames();
  }

  getGames(): void {
    this.gameService.getMyGames()
      .subscribe(data => this.data = data);
  }

  selected(event, game) {
    const state = event.target.value;
    const user = this.storageService.getData('userKey');
    this.gameService.addGame(user, game, state);
  }

  /**
   * Remove a game from the list entirely
   * @todo Not implemented
   * @param event
   * @param game
   */
  remove(event, game) {
    console.log('removing...');
    const user = this.storageService.getData('userKey');
    // this.gameService.removeGame(user, game);
    // @todo: Delete from from view as well...
    // get updated game list instead and refresh view?
  }
}
