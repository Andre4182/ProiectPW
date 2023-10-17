import { Component } from '@angular/core';
import { IComponent } from '../../models/component';
import { Router } from '@angular/router';
import { ComponentService } from '../../services/component.service';
import { CompDataService } from '../../services/comp-data.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent {

  name: string = "";
  price!: number;
  stock!: number;
  comp!: IComponent;
  text!: boolean;
  error: boolean = false;
  editedComp: IComponent | null;
  textButton: string = "Add Component";
  textUpdate!: boolean;

  constructor(private router: Router, private compData: CompDataService, private compService: ComponentService) { 
    this.editedComp = this.compData.getComp();
    if (this.editedComp) {
      this.name = this.editedComp.name;
      this.price = this.editedComp.price;
      this.stock = this.editedComp.stock;
      this.compData.clearComp();
      this.textButton = "Edit Component";
    }

  }

  submit(form: NgForm) {
    if (form.valid) {
      if (this.editedComp == null) {
        this.text = false;
        this.error = false;
        this.comp = this.createComponent();
        this.compService.createComponent(this.comp).subscribe(
          res => this.compData.setComp(res))
        //this.sendCar();
        this.text = true;
      }
      else {
        this.textUpdate = false;
        const updatedComp = this.createComponent();
        this.compService.updateComponent(this.editedComp.idComponent, updatedComp).subscribe()
        this.textUpdate = true;


      }
    }
    else
      this.error = true;

  }

  createComponent() {
    const component = {
      name: this.name,
      price: this.price,
      stock: this.stock
    };
    return component;
  }


}
