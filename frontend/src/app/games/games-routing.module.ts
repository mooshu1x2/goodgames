import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {GameListComponent} from './game-list/game-list.component';
import {GameDetailComponent} from './game-detail/game-detail.component';
import {GamesComponent} from './games.component';
import {Game} from './shared/game';

const gamesRoutes: Routes = [
  {
    path: '',
    component: GamesComponent,
    children: [
      {path: '', component: GameListComponent},
      {path: ':id', component: GameDetailComponent},
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(gamesRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class GameRoutingModule {
}
