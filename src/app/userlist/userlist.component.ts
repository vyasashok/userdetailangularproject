import {Component, OnInit} from '@angular/core';
import {userDetail} from './userdetail.model';
import {GetUesrsService} from '../services/get-users.service';
import {GetUserService} from '../services/get-user.service';
import {DeleteUserService} from '../services/delete-user.service';

@Component({
    selector:'app-userlist',
    templateUrl:'./userlist.component.html',
    styleUrls:['./userlist.component.css']
})

export class UserListComponent implements OnInit{
  
    users = [];

    constructor(private getUsersService: GetUesrsService,
                 private getUserService: GetUserService,
                 private deleteUserService: DeleteUserService){  }

    ngOnInit(){
       this.getUsers();
    }

    getUsers(){

        this.getUsersService.getUsers().subscribe((result)=>{
            console.log(result);
            if(result.response && result.response.length){
               
                this.users = result.response.map((ele)=>{
                    let imageName = "default.png";
                    if(ele.imageName){
                        imageName = ele.imageName;
                    }
                    return {
                        userId: ele.user_id,
                        firstName: ele.firstname,
                        lastName: ele.lastname,
                        gender: ele.gender,
                        email:ele.email,
                        city:ele.city,
                        skills: ele.skills,
                        imagePath: imageName
                    }
                })
            }
         })
    }


    onClickDelete(userId){
        if(confirm("Are you sure, want to delete?")){
            this.deleteUserService.deleteUser({userId:userId}).subscribe((result)=>{
                console.log(result)
                if(result.response){
                    this.users = this.users.filter((ele)=>{
                        if(ele.userId !== userId){
                          return ele;
                        }
                    })
                }
               alert(result.msg);
                
            })
        }
    }
    
}