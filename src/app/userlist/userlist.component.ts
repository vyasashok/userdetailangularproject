import {Component, OnInit} from '@angular/core';
import {userDetail} from './userdetail.model';
import {GetUesrsService} from '../services/get-users.service';
import {GetUserService} from '../services/get-user.service';

@Component({
    selector:'app-userlist',
    templateUrl:'./userlist.component.html',
    styleUrls:['./userlist.component.css']
})

export class UserListComponent implements OnInit{
  
    users = [];

    constructor(private getUsersService: GetUesrsService,
                 private getUserService: GetUserService){  }

    ngOnInit(){
       this.getUsers();
    }

    getUsers(){
        this.getUsersService.getUsers().subscribe((result)=>{
            console.log(result);
            this.users = result.response.map((ele)=>{
                return {
                    userId: ele.user_id,
                    firstName: ele.firstname,
                    lastName: ele.lastname,
                    gender: ele.gender,
                    email:ele.email,
                    city:ele.city,
                    skills: ele.skills,
                    imagePath:ele.imageName
                }
            })
         })
    }

    onClickEdit(userId){
        this.getUserService.getUser({userId:userId}).subscribe((result)=>{
          console.log(result)
        })
    }

    onClickView(userId){
       
    }

    onClickDelete(userId){
       
    }
    
}