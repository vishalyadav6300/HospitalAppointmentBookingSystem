import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  user:any;
  display=false;
  displayContent="Check";
  appointmentDetails:any;
  constructor(private ds:DataService,private router:Router) { }

  ngOnInit(): void {
    let username=localStorage.getItem('username');
    if(username==null)
    {
      alert('Please login');
      this.router.navigateByUrl('/login');
    }
    else{
      this.user=this.ds.getUserDetails(username).subscribe(data=>{
        if(data['message']==="no appointment")
          alert(data['message']);
        else{
         this.user=data['message']; 
         //console.log(this.user);
        }
     },err=>{
       console.log("Error",err);
     })
    }
  }
  changeRouter()
  {
    this.router.navigateByUrl("/appointment"); 
  }
  changeBool(){
    if(this.displayContent==="Display")
    {
      this.displayContent="Hide";
      this.display=true;
      if(this.user!==null)
      this.appointmentDetails=this.ds.getUserAppointmentDetails(this.user.username).subscribe(data=>{
        if(data['message']==="No appointments")
        alert(data['message']);
        else
        this.appointmentDetails=data['message'];
      })
    }
    else{
      this.displayContent="Display";
      this.display=false;
    }
  }
}
