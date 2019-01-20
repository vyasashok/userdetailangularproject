import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import {GetUserService} from '../services/get-user.service';
import {userDetail} from '../userlist/userdetail.model';

@Component({
  selector: 'app-viewdetail',
  templateUrl: './viewdetail.component.html',
  styleUrls: ['./viewdetail.component.css']
})
export class ViewdetailComponent implements OnInit {

  details = new userDetail("", "", "", "", "", "", "");

  constructor(private route:ActivatedRoute,
              private location: Location,
              private getUserService: GetUserService) { }

  ngOnInit() {
    const email = this.route.snapshot.paramMap.get('email');
    this.getUser(email);
  }



  getUser(email){

    this.getUserService.getUser({email:email}).subscribe((result)=>{
      //console.log(result);
      if(result.response){
        let firstName = result.response[0].firstname;
        let lastName = result.response[0].lastname;
        let email = result.response[0].email;
        let gender = result.response[0].gender;
        let city = result.response[0].city;
        let skills = result.response[0].skills;
        let imageName = result.response[0].imageName? result.response[0].imageName: "default.png";
  
        this.details = new userDetail(firstName,lastName,email,gender,skills,city,imageName);
      } 
      
   })
  }

  onClickBack(){
     this.location.back();
  }

}
