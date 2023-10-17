import { Component } from '@angular/core';
import { IComponent } from '../../models/component';
import { ComponentService } from '../../services/component.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-component',
  templateUrl: './show-component.component.html',
  styleUrls: ['./show-component.component.scss']
})
export class ShowComponentComponent {
  comp$!: IComponent;

  constructor(private componentService:ComponentService,private route:ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>
      { 
        var id = params.get('id');
        if(id)
          this.componentService.getComponent(id).subscribe(x =>{
            this.comp$ = x;
            console.log(x);
          })

    });
  }
  
}
