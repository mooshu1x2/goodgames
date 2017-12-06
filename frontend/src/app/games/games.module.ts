import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LayoutModule} from '../layout/layout.module';
import {GameRoutingModule} from './games-routing.module';

import {GameListComponent} from './game-list/game-list.component';
import {GameDetailComponent} from './game-detail/game-detail.component';
import {GamesComponent} from './games.component';

import {GameService} from './shared/game.service';
import { GameReviewsComponent } from './game-detail/game-reviews/game-reviews.component';

@NgModule({
  imports: [
    CommonModule,
    GameRoutingModule,
    LayoutModule,
  ],
  declarations: [
    GamesComponent,
    GameListComponent,
    GameDetailComponent,
    GameReviewsComponent,
  ],
  entryComponents: [
  ],
  providers: [
    GameService
  ]
})

export class GamesModule {
}
