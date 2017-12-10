import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {TeamComponent} from './team/team.component';
import {GameSearchComponent} from './search/game-search.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProfileComponent} from './profile/profile.component';
import {GameListComponent} from './review/game-list.component';

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
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'review',
    component: GameListComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      // { enableTracing: true } // <-- debugging purposes todo: turn off in production
    )
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
