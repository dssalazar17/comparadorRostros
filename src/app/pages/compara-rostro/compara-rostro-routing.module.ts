import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComparaRostroPage } from './compara-rostro.page';

const routes: Routes = [
  {
    path: '',
    component: ComparaRostroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComparaRostroPageRoutingModule {}
