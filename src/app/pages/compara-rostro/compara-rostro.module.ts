import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComparaRostroPageRoutingModule } from './compara-rostro-routing.module';

import { ComparaRostroPage } from './compara-rostro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComparaRostroPageRoutingModule
  ],
  declarations: [ComparaRostroPage]
})
export class ComparaRostroPageModule {}
