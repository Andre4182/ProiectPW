import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-xyz',
  templateUrl: './xyz.component.html',
  styleUrls: ['./xyz.component.scss']
})
export class XyzComponent {
  @Input() title:string = "a";
  @Input() subtitle:string ="b";
  @Output() description = new EventEmitter<string>();
  click = 0;
  sendData(){
    if(this.click % 2 == 0)
      this.description.emit("WOW you sent data!");
    else
      this.description.emit("You sent DATA AGAIN!");
    this.click++;
  }
}
