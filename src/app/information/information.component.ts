import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  appoints=[];selected=[];
  display=true;
  constructor(private ds:DataService,private router:Router) { }

  ngOnInit(): void {
      this.ds.getAppointmentInfo().subscribe(data=>{
        this.appoints=data['message'];
     },
     err=>{
       console.log("error in data");
     })
     this.inqApp();
     //this.selected=this.appoints.filter(function(x) {return x.approve==="inqueue"});
  }
  notApproveAppointment(appObj:any){
    appObj['approve']='Not Approved';
    if(window.confirm("Are you sure?"))
    {
       this.ds.updateAppointment(appObj).subscribe(data=>{
         alert(data['message']);
       },err=>{
         console.log("error",err);
       })
       this.ds.getAppointmentInfo().subscribe(data=>{
        this.appoints=data['message'];
     },
     err=>{
       console.log("error in data");
     })
    }
  }
  approveAppointment(appObj:any){
       appObj['approve']='Approved';
       if(window.confirm("Are you sure?"))
       {
          this.ds.updateAppointment(appObj).subscribe(data=>{
            alert(data['message']);
          },err=>{
            console.log("error",err);
          })
          this.ds.getAppointmentInfo().subscribe(data=>{
            this.appoints=data['message'];
         },
         err=>{
           console.log("error in data");
         })
       }
  }
  inqApp(){
    this.display=true;
    this.selected=this.appoints.filter(function(x) {return x.approve==="inqueue"});
  }
  appApp(){
    this.display=false;
    this.selected=this.appoints.filter(function(x) {return x.approve==="Approved"});
    this.selected.sort((a, b) => (a.appointdate>b.appointdate?1:-1));
  }
  rejectApp(){
    this.display=false;
    this.selected=this.appoints.filter(function(x) {return x.approve==="Not Approved"});
  }


}
