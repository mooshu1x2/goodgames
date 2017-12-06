import {Component, OnInit, ViewEncapsulation, ViewChild, Input, Output} from '@angular/core';
import {GameService} from '../../shared/game.service';

import {Game, Comment} from '../../shared/game';

import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-game-reviews',
  templateUrl: './game-reviews.component.html',
  styleUrls: ['./game-reviews.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GameReviewsComponent implements OnInit {
  @Input() comment: Comment;
  @Output() user_review: boolean;
  @Output() critic_review: boolean;
  constructor(private gameService: GameService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getComments();
  }

  getComments(): void {
    this.route.params.subscribe((params: any) => {
      if (params['id']) {
        const id = params['id'];
        const type = params['type'];
        this.gameService.getGameComments(id, type).subscribe((comment => this.comment = comment));
      }
    });
  }
}
