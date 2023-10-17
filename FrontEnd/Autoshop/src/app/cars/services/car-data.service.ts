import { Injectable } from '@angular/core';
import { ICar } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarDataService {
  private car: ICar | null = null;

  setCar(car: ICar) {
    this.car = car;
  }

  clearCar(){
    this.car = null;
  }

  getCar() {
    return this.car;
  }
}
