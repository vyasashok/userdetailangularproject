import { Component, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy} from '@angular/core';
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
import { Router } from "@angular/router";
import {Location} from '@angular/common';
import {PopupDirective} from '../directives/popup.directive';
import {PopupComponent} from '../popup/popup.component';
import {PopUpDataComponent} from '../popup/popupdata.component';
import {PopUpService} from '../services/popup-service';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {

  prsnl = false;
  photo = true;
  valid = false;
  validationError = {
    firstNameError: "",
    lastNameError:"",
    emailError:"",
    skillError:""
  };

  @ViewChild(PopupDirective) popupHost: PopupDirective;

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
              private editUserService: EditUserService,
              private router: Router,
              private location: Location,
              private componentFactoryResolver: ComponentFactoryResolver,
              private popupService: PopUpService
              ) { 
            
                popupService.popupSource$.subscribe((response)=>{
                  if(response.id === "myCityModal"){
                    this.onClickAddCity(response.REF);
                  }
                  else{
                    this.onClickAddSkill(response.REF);
                  }
                })
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

    this.validationError = {
      firstNameError: "",
      lastNameError:"",
      emailError:"",
      skillError:""
    };

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

  onUploadPhoto(image){
   // event.preventDefault();
      this.uploadImageService.uploadImage(image.files[0]).subscribe((res)=>{
        this.details.imagePath = image.files[0].name;
        alert("image uploaded successfuly!")
      });

  }

  onClickAddCity(newCity){
    let value = newCity.value;
    if(this.cities.indexOf(value) === -1){
     
      this.saveCityService.saveCity({cityName:value}).subscribe((res)=>{
       // console.log(res);
       alert("city added");
       this.cities.push(value);
       newCity.value="";
      })
    }
  }

  onClickAddSkill(newSkill){
    let value = newSkill.value;
    if(this.skills.indexOf(value) === -1){
 
      this.saveSkillService.saveSkill({skillName:value}).subscribe((res)=>{
        //console.log(res);
        alert("skill added");
        this.skills.push(value);
        newSkill.value="";
      })
    }
  }

  getMasterData(){

    this.getMasterDataService.getMasterData().subscribe((result)=>{
       console.log(result);
       if(result.response){
          this.cities = result.response.cities.map((ele)=>{
            return ele.cityname;
          });

        this.skills = result.response.skills.map((ele)=>{
          return ele.skillname;
        })
       }
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

  onClickClear(){
    this.details =  new userDetail("", "", "", "", [], "", "");
  }

  onClickBack(){
    this.location.back();
  }

  onFocus(){
    this.validationError = {
      firstNameError: "",
      lastNameError:"",
      emailError:"",
      skillError:""
    };
  }

  onClickPopUpBtn(id){
    let viewContainerRef = this.popupHost.viewContainerRef;
    viewContainerRef.clear();
    let data;
    if(id === "city"){
      data = {
         id:"myCityModal",
         heading: "Add City",
         on_click: "onClickAddCity(inputRef)"
      }
    }
    else{
      data = {
        id:"mySkillModal",
        heading: "Add Skill",
        on_click: "onClickAddSkill(inputRef)"
     }
    }

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(PopupComponent);
    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<PopUpDataComponent>componentRef.instance).data = data;
  }

  onSubmit(){

    const email = this.route.snapshot.paramMap.get('email');

    this.validation();

    if(email){
      let data = {
         details:this.details,
         email:email
      }
      if(this.valid){
        this.editUserService.editUser(data).subscribe((res)=>{
          console.log(res);      
          alert(res.msg); 
          if(!res.err){
            this.router.navigate(['/users']); 
          }         
        })
      }
    }
    else{
      if(this.valid){
        this.saveUserService.saveUser(this.details).subscribe((res)=>{
          console.log(res);
          alert(res.msg); 
          if(!res.err){
            this.router.navigate(['/users']); 
          } 
        })
      }
    }  

  }

  validation(){
    const  NAME_REG_EXP = /^[a-zA-Z' ]{1,}$/;
    const  EMAIL_REG_EXP = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    
    let firstNameValidationStatus = NAME_REG_EXP.test(this.details.firstName);
   // let lastNameValidationStatus = NAME_REG_EXP.test(this.details.lastName);
    let emaiValidationStatus = EMAIL_REG_EXP.test(this.details.email);
    let skillValidationstatus = (this.details.skills.length > 0);
    
    if(firstNameValidationStatus  && emaiValidationStatus && skillValidationstatus){
         this.valid = true;
    }
    else{
      if(!firstNameValidationStatus){
        this.validationError.firstNameError = "Invalid First Name!";
      }

      // if(!lastNameValidationStatus){
      //   this.validationError.lastNameError = "Invalid Last Name!"
      // }

      if(!emaiValidationStatus){
         this.validationError.emailError="Invalid Email!"
      }

      if(!skillValidationstatus){
        this.validationError.skillError="altest one skill required!"
      }
    }
  }

}
