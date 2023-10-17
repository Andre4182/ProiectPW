import { Injectable } from '@angular/core';
import { IComponent } from '../models/component';

@Injectable({
  providedIn: 'root'
})
export class CompDataService {

  constructor() { }
  private comp: IComponent | null = null;

  setComp(comp: IComponent) {
    this.comp = comp;
  }

  clearComp(){
    this.comp = null;
  }

  getComp() {
    return this.comp;
  }
}
