import { Component, OnInit } from '@angular/core';
import { IComponent } from '../../models/component';
import { ComponentService } from '../../services/component.service';
import { Router } from '@angular/router';
import { CompDataService } from '../../services/comp-data.service';
import { NgToastComponent, NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-index-components',
  templateUrl: './index-components.component.html',
  styleUrls: ['./index-components.component.scss']
})
export class IndexComponentsComponent implements OnInit {
  components$!: IComponent[];
  minPrice!: number;

  constructor(private componentService: ComponentService, private router: Router, private compData: CompDataService, private toast:NgToastService, private auth : AuthService) { }

  ngOnInit(): void {
    this.loadAllComp();
    const comp = this.compData.getComp();
    if (comp)
      this.components$.push(comp);
    this.compData.clearComp();
  }

  showComp(comp: IComponent) {
    if(this.isLoggedOut()==true){
      this.toast.error({detail:"ERROR", summary:"You need to be logged in", duration: 5000})
      this.router.navigate([`/login`]);
    }else{
    this.router.navigate([`/components/${comp.idComponent}`]);
  }
}

  loadAllComp(){
    
    this.componentService.getComponents().subscribe(x => {
      this.components$ = x;
      console.log(x);
    })
  }

  deleteComp(comp: IComponent) {
    if(this.isLoggedOut()==true){
      this.toast.error({detail:"ERROR", summary:"You need to be logged in", duration: 5000})
      this.router.navigate([`/login`]);
    }else{
    this.componentService.deleteComponent(comp.idComponent).subscribe(
      res => {
        const compIndex = this.components$.indexOf(comp);
        this.components$.splice(compIndex, 1);
      }
    )
    }
  }

  createComp() {
    if(this.isLoggedOut()==true){
      this.toast.error({detail:"ERROR", summary:"You need to be logged in", duration: 5000})
      this.router.navigate([`/login`]);
    }else{
    this.router.navigate([`/components/add-form`]);
  }
  }

  updateComp(comp: IComponent) {
    this.compData.setComp
      (comp);
    this.router.navigate(['/components/add-form']);
  }

  getTotalValue():any {
    if(this.isLoggedOut()==true){
      this.toast.error({detail:"ERROR", summary:"You need to be logged in", duration: 5000})
      this.router.navigate([`/login`]);
    }else{
    var sum = 0;
    this.components$.forEach(comp => {
      sum += comp.price * comp.stock;
    })
    console.log(sum);
    return sum;}
  }
  calculateMin():any {
    if(this.isLoggedOut()==true){
      this.toast.error({detail:"ERROR", summary:"You need to be logged in", duration: 5000})
      this.router.navigate([`/login`]);
    }else{
    var comps = this.components$;
    if (this.minPrice) {
      comps = this.components$.filter(comp => comp.price > this.minPrice);
    }
    return comps;
  }
  }
  isLoggedOut(){
    if(this.auth.isLoggedIn()==false){
      this.toast.error({detail:"ERROR", summary:"You need to be logged in", duration: 5000})
    }
  
    return !this.auth.isLoggedIn();
  
  }

}
