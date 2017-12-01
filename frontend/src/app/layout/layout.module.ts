import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SplashComponent } from './splash/splash.component';


@NgModule({
  imports: [
    CommonModule,
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
  ],
  providers: [
  ]
})

export class LayoutModule {
  constructor(@Optional() @SkipSelf() parentModule: LayoutModule) {
    // throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
