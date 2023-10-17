import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { ICar } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http:HttpClient) { }

  getCars(): Observable<ICar[]>{
    return this.http.get<ICar[]>('https://localhost:7202/cars');
  }
  getCar(id:string): Observable<ICar>{
    return this.http.get<ICar>('https://localhost:7202/cars/' + id);
  }
  deleteCar(id:number | undefined): Observable<ICar>{
    return this.http.delete<ICar>('https://localhost:7202/cars/' + id);
  }
  createCar(car: ICar | undefined): Observable<ICar>{
    return this.http.post<ICar>('https://localhost:7202/cars/', car);
  }
  updateCar(id:number | undefined, car:ICar | undefined): Observable<ICar>{
    return this.http.put<ICar>('https://localhost:7202/cars/' + id,car);
  }
}
