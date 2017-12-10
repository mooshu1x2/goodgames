import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {MaterializeModule} from 'angular2-materialize';

import {LayoutModule} from './layout/layout.module';
import {AuthModule} from './auth/auth.module';

import {AppComponent} from './app.component';

import {HomeComponent} from './home/home.component';
import {TeamComponent} from './team/team.component';
import {GameTopComponent} from './games/game-top/game-top.component';
import {GameSearchComponent} from './search/game-search.component';
import {GameResultsComponent} from './search/game-results/game-results.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProfileComponent} from './profile/profile.component';
import {GameListComponent} from './review/game-list.component';

import {StorageService} from './storage.service';

@NgModule({
  declarations: [
    AppComponent,
    GameTopComponent,
    HomeComponent,
    ProfileComponent,
    GameSearchComponent,
    GameResultsComponent,
    TeamComponent,
    DashboardComponent,
    GameListComponent
  ],
  exports: [
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LayoutModule,
    AuthModule,
    MaterializeModule,
    FormsModule,
  ],
  providers: [StorageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
