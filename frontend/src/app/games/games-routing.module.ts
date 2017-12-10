import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {GameDetailComponent} from './game-detail/game-detail.component';
import {GamesComponent} from './games.component';

const gamesRoutes: Routes = [
  {
    path: '',
    component: GamesComponent,
    children: [
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
