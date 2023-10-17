import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ICar } from '../../models/car';
import { ActivatedRoute, Router } from '@angular/router';
import { CarDataService } from '../../services/car-data.service';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})

export class AddFormComponent {

  brand: string = "";
  model: string = "";
  productionYear!: number;
  stock!: number;
  car!: ICar;
  text!: boolean;
  error: boolean = false;
  editedCar: ICar | null;
  textButton: string = "Add car";
  textUpdate!: boolean;

  //@Output() ceva = new EventEmitter<ICar>();
  constructor(private router: Router, private carData: CarDataService, private carService: CarService) {
    this.editedCar = this.carData.getCar();
    if (this.editedCar) {
      this.brand = this.editedCar.brand;
      this.model = this.editedCar.model;
      this.productionYear = this.editedCar.productionYear;
      this.stock = this.editedCar.stock;
      this.carData.clearCar();
      this.textButton = "Edit car";
    }

  }

  submit(form: NgForm) {
    if (form.valid) {
      if (this.editedCar == null) {
        this.text = false;
        this.error = false;
        this.car = this.createCar();
        this.carService.createCar(this.car).subscribe(
          res => this.carData.setCar(res))
        //this.sendCar();
        this.text = true;
      }
      else {
        this.textUpdate = false;
        const updatedCar = this.createCar();
        this.carService.updateCar(this.editedCar.idCar, updatedCar).subscribe()
        this.textUpdate = true;


      }
    }
    else
      this.error = true;

  }
  // sendCar() {
  //   this.carService.createCar(this.car).subscribe(
  //     res => this.ceva.emit(res)
  //   )
  // }
  createCar() {
    const car = {
      brand: this.brand,
      model: this.model,
      productionYear: this.productionYear,
      stock: this.stock
    };
    return car;
  }
}
