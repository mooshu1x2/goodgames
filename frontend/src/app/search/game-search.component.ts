import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {GameService} from '../games/shared/game.service';
import {ActivatedRoute} from '@angular/router';

import {Game} from '../games/shared/game';
// import {GameService} from '../games/shared/game.service';

@Component({
  selector: 'app-search',
  templateUrl: './game-search.component.html',
  styleUrls: ['./game-search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GameSearchComponent implements OnInit {

  constructor(private gameService: GameService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getGame();
  }

  getGame(): void {
    this.route.params.subscribe((params: any) => {
      console.log(params);
      // if (params['id']) {
      //   const id = params['id'];
      //   this.gameService.getGameById(id).subscribe((game => this.game = game));
      // }
    });
  }
}
