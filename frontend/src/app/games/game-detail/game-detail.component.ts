import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Game} from '../shared/game';
import {GameService} from '../shared/game.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GameDetailComponent implements OnInit{
  @Input() game: Game;

  constructor(private gameService: GameService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getGame();
  }

  getGame(): void {
    this.route.params.subscribe((params: any) => {
      if (params['id']) {
        const id = params['id'];
        this.gameService.getGameById(id).subscribe((game => this.game = game));
      }
    });
  }

  like(game: Game) {
    return new Promise((resolve, reject) => {
      this.gameService.like(game).subscribe(() => {
        resolve(true);
      }, (error) => {
        reject(error);
      });
    });
  }

}
