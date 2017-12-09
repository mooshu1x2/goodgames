import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LoginComponent} from './auth/login/login.component';
import {HomeComponent} from './home/home.component';
import {TeamComponent} from './team/team.component';
// import {GameTopComponent} from './games/game-top/game-top.component';
import {GameSearchComponent} from './search/game-search.component';
import {GameResultsComponent} from './search/game-results/game-results.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'team',
    component: TeamComponent
  },
  {
    path: 'games',
    loadChildren: 'app/games/games.module#GamesModule'
  },
  {
    path: 'search/:term',
    component: GameSearchComponent
  },
  {
    path: 'search/:field/:id',
    component: GameSearchComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      // { enableTracing: true } // <-- debugging purposes todo: turn off in production
    )
  ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
