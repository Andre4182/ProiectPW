import { Component, OnInit } from '@angular/core';
import { ICar } from '../../models/car';
import { CarService } from '../../services/car.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-car',
  templateUrl: './show-car.component.html',
  styleUrls: ['./show-car.component.scss']
})
export class ShowCarComponent implements OnInit {
  car$: ICar | undefined;

  constructor(private carService:CarService,private route:ActivatedRoute){}

  ngOnInit(): void {
   this.route.paramMap.subscribe(params =>
       { 
       var id = params.get('id');
        if(id)
           this.carService.getCar(id).subscribe(x =>{
            this.car$ = x;
            console.log(x);
          })

     });
  }

  getCar(){
    const id = this.route.snapshot.params['id'];
    this.carService.getCar(id).subscribe(x => this.car$ = x);
  }


}
