import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// import {throwIfAlreadyLoaded} from './module-import-guard';
// import {LoggerService} from './logger.service';

// import {NavComponent} from './nav/nav.component';
import {FooterComponent} from './footer/footer.component';
// import {SharedModule} from '../shared/modules/shared.module';
import {RouterModule} from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SplashComponent } from './splash/splash.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
// import {SearchBarComponent} from './search-bar/search-bar.component';
// import {Error404Component} from './error404/error-404.component';


@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
    // RouterModule,
    // SharedModule,
    // ReactiveFormsModule
  ],
  exports: [
    // NavComponent,
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
    // SearchBarComponent,
    // Error404Component
  ],
  providers: [
    // LoggerService,
  ]
})

export class LayoutModule {
  constructor(@Optional() @SkipSelf() parentModule: LayoutModule) {
    // throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
