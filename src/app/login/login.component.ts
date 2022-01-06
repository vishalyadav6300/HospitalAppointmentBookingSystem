import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  bool;  
  constructor(private ds:DataService,private rc:Router) { }

  ngOnInit(): void {
    this.bool=false;
  }
  changeValueA(){
     this.bool=false;
  }
  changeValueU(){
    this.bool=true;
  }
  onRegister(){
    //console.log("hiii");
    this.rc.navigateByUrl("register");
  }
  onSubmit(value:any){
    if(value.username==="")
    alert("username cannot be null");
    else if(value.password==="")
    alert("password cannot be null");
    else if(this.bool===false)
    {
       this.ds.checkLoginDetailsAdmin(value).subscribe(data=>{
          if(data['message']==="Invalid Access!!!")
          {
            alert("Invalid credentails!!!");
            this.rc.navigateByUrl('/login');
          }
          else{
            // localStorage.setItem("Admin","Hiiiii");
            this.rc.navigateByUrl('/information');
          }
       },err=>{console.log("error",err);})
    }
    else
    {
        this.ds.checkLoginDetailsUser(value).subscribe(data=>{
          if(data['message']==="username is invalid")
          {
            alert("Please enter valid username");
            this.rc.navigateByUrl('/login');
          }
          else if(data['message']==="password is incorrect")
          {
            alert("please enter valid password");
            this.rc.navigateByUrl('/login'); 
          }
          else{
            localStorage.setItem("username",data['userdetails'].username);
          this.rc.navigateByUrl(`/details/${data['userdetails'].username}`);
          }
          },
          err=>{console.log("error",err);})
    }
 }

}
