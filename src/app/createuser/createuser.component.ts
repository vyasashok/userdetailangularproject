import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {userDetail} from '../userlist/userdetail.model';
import {SaveuserService} from '../services/saveuser.service';
import {UploadimageService} from '../services/uploadimage.service';
import {SavecityService} from '../services/savecity.service';
import {SaveskillService} from '../services/saveskill.service';
import {GetMasterDataService} from '../services/get-master-data.service';
import {GetUserService} from '../services/get-user.service';
import {EditUserService} from '../services/edit-user.service';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {

  prsnl = false;
  photo = true;

  EditOrSubmitBtn = "Submit";

  skills = ["c#", "Javascript", "Nodejs"];

  cities = ["Mumbai", "Jaipur", "Udaipur"]

  details = new userDetail("", "", "", "", [], "", "");

  constructor(private route: ActivatedRoute,
              private saveUserService: SaveuserService, 
              private uploadImageService: UploadimageService,
              private saveCityService: SavecityService,
              private saveSkillService: SaveskillService,
              private getMasterDataService: GetMasterDataService,
              private getUserService: GetUserService,
              private editUserService: EditUserService
              ) { 
            

  }

  ngOnInit() {
    const email = this.route.snapshot.paramMap.get('email');
    if(email){
       this.EditOrSubmitBtn = "Edit";
       this.getUser(email);
    }
    this.getMasterData()
  }

  toggleTab(prsnlDtl, upldPht, id){
      if(id==="detail"){
        prsnlDtl.classList.add("active");
        upldPht.classList.remove("active");
        this.prsnl = false;
        this.photo = true;
      }
      else{
        prsnlDtl.classList.remove("active");
        upldPht.classList.add("active");
        this.prsnl = true;
        this.photo = false;
      }
  }

  onChangeCheckBox(e){
     if(e.target.checked){
       this.details.skills.push(e.target.value)
     }
     else{
       if(this.details.skills.indexOf(e.target.value) > -1){
        this.details.skills =  this.details.skills.filter((ele)=>{
             if(ele !== e.target.value){
                return ele;
             }
        }) 
       }
     }
  }

  onUploadPhoto(image, event){
    event.preventDefault();
      this.uploadImageService.uploadImage(image.files[0]).subscribe((res)=>{
        this.details.imagePath = image.files[0].name;
        return false;
      });

  }

  onClickAddCity(newCity){
    if(this.cities.indexOf(newCity) === -1){
    
      this.saveCityService.saveCity({cityName:newCity}).subscribe((res)=>{
       // console.log(res);
       this.cities.push(newCity);
      })
    }
  }

  onClickAddSkill(newSkill){
    if(this.skills.indexOf(newSkill) === -1){
 
      this.saveSkillService.saveSkill({skillName:newSkill}).subscribe((res)=>{
        //console.log(res);
        this.skills.push(newSkill);
      })
    }
  }

  getMasterData(){

    this.getMasterDataService.getMasterData().subscribe((result)=>{
       console.log(result);

       this.cities = result.response.cities.map((ele)=>{
          return ele.cityname;
       });

       this.skills = result.response.skills.map((ele)=>{
        return ele.skillname;
       })

    })
    
  }

  getUser(email){
    this.getUserService.getUser({email:email}).subscribe((result)=>{
      //console.log(result);

      let firstName = result.response[0].firstname;
      let lastName = result.response[0].lastname;
      let email = result.response[0].email;
      let gender = result.response[0].gender;
      let city = result.response[0].city;
      let skills = result.response[0].skills.split(',');
      let imageName = result.response[0].imageName;

      this.details = new userDetail(firstName,lastName,email,gender,skills,city,imageName);
       
   })
  }

  onSubmit(){

    const email = this.route.snapshot.paramMap.get('email');

    if(email){
      let data = {
         details:this.details,
         email:email
      }
      this.editUserService.editUser(data).subscribe((res)=>{
        console.log(res);
      })
    }
    else{
      this.saveUserService.saveUser(this.details).subscribe((res)=>{
        console.log(res);
      })
    }  

  }

}
