import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IComponent } from '../models/component';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  constructor(private http:HttpClient) { }

  getComponents(): Observable<IComponent[]>{
    return this.http.get<IComponent[]>('https://localhost:7202/components');
  }
  getComponent(id:string): Observable<IComponent>{
    return this.http.get<IComponent>('https://localhost:7202/components/' + id);
  }
  deleteComponent(id:number | undefined): Observable<IComponent>{
    return this.http.delete<IComponent>('https://localhost:7202/components/' + id);
  }
  createComponent(component: IComponent | undefined): Observable<IComponent>{
    return this.http.post<IComponent>('https://localhost:7202/components/', component);
  }
  updateComponent(id:number | undefined, component: IComponent | undefined): Observable<IComponent>{
    return this.http.put<IComponent>('https://localhost:7202/components/' + id,component);
  }
}
