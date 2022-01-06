import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  date:string="";
  today = new Date();
  dd = String(this.today.getDate()).padStart(2, '0');
  mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
  yyyy = this.today.getFullYear();
  constructor(private ds:DataService,private router:Router) { }

  ngOnInit(): void {
    this.dd=String(this.today.getDate()).padStart(2, '0');
    this.mm=String(this.today.getMonth() + 1).padStart(2, '0');
    this.yyyy=this.today.getFullYear();
    this.date=this.yyyy + '-' + this.mm + '-' + this.dd;
    let user=localStorage.getItem("username");
    if(user===null)
    {
      alert('To get an appointment must login!!!');
      this.router.navigateByUrl('/login');
    }
  }
  onSubmit(value:any){
     if(value.patientname==="")
     alert("Entered Invaild name!!!");
     else if(value.phoneno==="")
     alert("Entered Invalid phone number!!!");
     else if(value.gender==="")
     alert("Entered Invalid gender!!!");
     else if(value.appointdate<this.date)
     alert("Entered Invalid date!!!");
     else if(value.timeint==="")
     alert("please select shifts!!!")
     else if(value.details==="")
     alert("please select details!!!")
     else
     {
        value['approve']='inqueue';
        value['points']=0;
        if(value['details']==="Accident")
         value['points']=5;
        else if(value['details']==="Mild disease")
          value['points']=3;
        else if(value['details']==="Viral Fever")
          value['points']=4;
        if(value['gender']==="Female")
          value['points']+=1;
        let username=localStorage.getItem("username");
        value['username']=username;
        this.ds.createAnAppointement(value).subscribe(data=>{
          alert(data['message']);
        if(data['message']==="Appointment created successfully")
           this.router.navigateByUrl(`/details/${username}`);
        },err=>{console.log("error in ts"+err);})
     }
  }

}
