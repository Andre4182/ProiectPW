import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexCarsComponent } from './containers/index-cars/index-cars.component';
import { ShowCarComponent } from './containers/show-car/show-car.component';
import { AddFormComponent } from './containers/add-form/add-form.component';

const routes: Routes = [
  {
    path: '',
    component: IndexCarsComponent,
    pathMatch: 'full'
  },
  {
    path: 'add-form',
    component: AddFormComponent,
  },
  {
    path: ':id',
    component: ShowCarComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarsRoutingModule { }
