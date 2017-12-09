import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SearchBarComponent} from './search-bar/search-bar.component';
import {ProfileComponent} from '../profile/profile.component';

const layoutRoutes: Routes = [
  {
    path: '',
    component: SearchBarComponent,
  },
  {
    path: 'profile/:user',
    component: ProfileComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(layoutRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class LayoutRoutingModule {
}
