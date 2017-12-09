import {Component, OnInit, ViewEncapsulation, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {GameService} from '../../shared/game.service';
import {Comment} from '../../shared/game';

@Component({
  selector: 'app-game-reviews',
  templateUrl: './game-reviews.component.html',
  styleUrls: ['./game-reviews.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GameReviewsComponent implements OnInit {
  @Output() comments: Comment;
  // @Output() user_review: boolean;
  // @Output() critic_review: boolean;
  constructor(private gameService: GameService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getComments();
  }

  getComments(): void {
    this.route.params.subscribe((params: any) => {
      if (params['id']) {
        const id = params['id'];
        // const type = params['type'];
        this.gameService.getGameComments(id).subscribe((comments => this.comments = comments));
        console.log('Comments = ');
        console.log(this.comments);
      }
    });
  }
}
