import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SearchBarComponent} from './search-bar/search-bar.component';

const layoutRoutes: Routes = [
  {
    path: '',
    component: SearchBarComponent,
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
