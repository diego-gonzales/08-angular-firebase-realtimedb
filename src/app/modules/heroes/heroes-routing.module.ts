import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesListComponent } from './pages/heroes-list/heroes-list.component';
import { HeroesManageComponent } from './pages/heroes-manage/heroes-manage.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: HeroesListComponent,
      },
      {
        path: 'add',
        component: HeroesManageComponent
      },
      {
        path: 'edit/:heroID',
        component: HeroesManageComponent
      },
      {
        path: '**',
        redirectTo: 'list'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
