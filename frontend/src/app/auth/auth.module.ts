import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    LoginComponent,
    LogoutComponent,
  ],
  declarations: [
    LoginComponent,
    LogoutComponent,
  ],
  providers: [
  ]
})

export class AuthModule {
  constructor(@Optional() @SkipSelf() parentModule: AuthModule) {
    // throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
