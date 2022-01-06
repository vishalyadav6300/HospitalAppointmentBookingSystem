import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private ds:DataService,private router:Router) { }

  ngOnInit(): void {
  }
  onSignup(value:any){
        if(value.fullname==="")
        alert("Entered Invaild name!!!");
        else if(value.email==="")
        alert("Entered Invalid email id!!!");
        else if(value.gender==="")
        alert("Entered Invalid gender!!!");
        else if(value.dob==="")
        alert("Entered Invaild date!!!")
        else if(value.phoneno==="")
        alert("Entered Invalid phone number!!!")
        else if(value.username==="")
        alert("username cannot be null");
        else if(value.password==="")
        alert("password cannot be null");
       this.ds.createAccount(value).subscribe(data=>{
          if(data['message']==="user created successfully")
          this.router.navigateByUrl('/login');
       },err=>{
          console.log("Error",err);
       });     
  }

}
