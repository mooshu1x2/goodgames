import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LayoutRoutingModule} from './layout-routing.module';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SplashComponent } from './splash/splash.component';
import { MaterializeModule } from 'angular2-materialize';

import { GameService} from '../games/shared/game.service';
import { FormsModule} from '@angular/forms';
import { GoogleSignInComponent} from 'angular-google-signin';
import { UserService} from '../user/user.service';
import { StorageService} from '../storage.service';
import { FacebookModule } from 'ngx-facebook';

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MaterializeModule,
    FormsModule,
    FacebookModule.forRoot(),
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
    UserService,
    StorageService
  ]
})

export class LayoutModule {
  constructor(@Optional() @SkipSelf() parentModule: LayoutModule) {
    // throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
