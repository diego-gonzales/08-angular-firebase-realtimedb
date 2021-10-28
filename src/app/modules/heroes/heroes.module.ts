import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroesListComponent } from './pages/heroes-list/heroes-list.component';
import { HeroesManageComponent } from './pages/heroes-manage/heroes-manage.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    HeroesListComponent,
    HeroesManageComponent
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class HeroesModule { }
