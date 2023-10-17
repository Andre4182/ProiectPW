import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsRoutingModule } from './components-routing.module';
import { IndexComponentsComponent } from './containers/index-components/index-components.component';
import { ShowComponentComponent } from './containers/show-component/show-component.component';
import { AddFormComponent } from './containers/add-form/add-form.component';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';


@NgModule({
  declarations: [
    IndexComponentsComponent,
    ShowComponentComponent,
    AddFormComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ComponentsRoutingModule,
    MatGridListModule

  ]
})
export class ComponentsModule { }
