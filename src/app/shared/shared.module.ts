import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { AlertMessageComponent } from './components/alert-message/alert-message.component';



@NgModule({
  declarations: [
    SpinnerComponent,
    AlertMessageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SpinnerComponent,
    AlertMessageComponent
  ]
})
export class SharedModule { }
