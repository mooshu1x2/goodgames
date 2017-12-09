import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LayoutRoutingModule} from './layout-routing.module';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SplashComponent } from './splash/splash.component';
import { MaterializeModule } from 'angular2-materialize';

import { LoginComponent } from '../auth/login/login.component';
import { GameService} from '../games/shared/game.service';
import { FormsModule } from '@angular/forms';

// import { AuthService, AppGlobals } from 'angular2-google-login';
import { GoogleSignInComponent} from 'angular-google-signin';

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MaterializeModule,
    FormsModule,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    SplashComponent,
    SearchBarComponent,
  ],
  declarations: [
    FooterComponent,
    HeaderComponent,
    SplashComponent,
    SearchBarComponent,
    GoogleSignInComponent,
  ],
  providers: [
    GameService,
  ]
})

export class LayoutModule {
  constructor(@Optional() @SkipSelf() parentModule: LayoutModule) {
    // throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
