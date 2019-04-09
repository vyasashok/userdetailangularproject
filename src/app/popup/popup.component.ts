import { Component, OnInit, Input} from '@angular/core';
import {PopUpDataComponent} from './popupdata.component';
import {PopUpService} from '../services/popup-service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements PopUpDataComponent {
  @Input() data: any;
  constructor(private popupService :PopUpService) { 

  }

  ngOnInit() {
  }

  onClick(data: any){
    this.popupService.dataToSave(data);
  }

}
