import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LayoutModule} from '../layout/layout.module';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MaterializeModule } from 'angular2-materialize';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    MaterializeModule,
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
