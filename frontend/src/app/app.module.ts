import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {GameTopComponent} from './games/game-top/game-top.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

import { LayoutModule } from './layout/layout.module';
import { AuthModule } from './auth/auth.module';

import { TeamComponent } from './team/team.component';
import {GameSearchComponent} from './search/game-search.component';
import {GameResultsComponent} from './search/game-results/game-results.component';
import { MaterializeModule } from 'angular2-materialize';

@NgModule({
  declarations: [
    AppComponent,
    GameTopComponent,
    HomeComponent,
    ProfileComponent,
    GameSearchComponent,
    GameResultsComponent,
    TeamComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LayoutModule,
    AuthModule,
    MaterializeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
