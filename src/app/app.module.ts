import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {UserListComponent} from './userlist/userlist.component';
import { UserComponent } from './userlist/user/user.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { ActiveDirective } from './directives/active.directive';
import { ViewdetailComponent } from './viewdetail/viewdetail.component';


@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserComponent,
    CreateuserComponent,
    ActiveDirective,
    ViewdetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
