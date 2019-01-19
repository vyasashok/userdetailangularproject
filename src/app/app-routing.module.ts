import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserListComponent} from './userlist/userlist.component';
import {CreateuserComponent} from './createuser/createuser.component';

const routes: Routes = [
  {path: '', redirectTo:'/users', pathMatch:'full'},
  {path:'users', component:UserListComponent},
  {path:'user/add', component:CreateuserComponent},
  {path:'user/edit/:email', component:CreateuserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
