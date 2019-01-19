import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appActive]'
})
export class ActiveDirective {

  status:boolean = false;

  constructor() { }

  @HostListener('click') onClick() {

    this.toggleActiveClass();
  }
  
  @HostBinding('class') cls;


 
  private toggleActiveClass() {

     
    if(!this.status){
       this.cls = 'active';
       this.status = true;
    }
    else{
      this.cls = '';
      this.status = false;
    }
  }

}
