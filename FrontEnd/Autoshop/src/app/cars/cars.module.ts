import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarsRoutingModule } from './cars-routing.module';
import { IndexCarsComponent } from './containers/index-cars/index-cars.component';
import { ShowCarComponent } from './containers/show-car/show-car.component';
import { AddFormComponent } from './containers/add-form/add-form.component';
import { FormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';

@NgModule({
  declarations: [
    IndexCarsComponent,
    ShowCarComponent,
    AddFormComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    CarsRoutingModule,
    MatGridListModule
  ]
})
export class CarsModule { }
