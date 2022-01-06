import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private hc:HttpClient) { }
  
  checkLoginDetailsUser(cred:any):Observable<any>{
    return this.hc.post("/login/user",cred);
  }
  
  checkLoginDetailsAdmin(cred:any):Observable<any>{
    return this.hc.post('/login/admin',cred);
  }

  createAnAppointement(appointment:any):Observable<any>{
    return this.hc.post("/appointment",appointment);
  }

  getAppointmentInfo():Observable<any>{
    return this.hc.get("/appointmentdetails");
  }
  deleteAppointment(Obj:any):Observable<any>{
    return this.hc.delete('/delete/'+Obj.email);
  }
 
  getUserAppointmentDetails(username):Observable<any>{
    return this.hc.get(`/getuserappinfo/${username}`);
  }
  updateAppointment(Obj:any):Observable<any>{
    return this.hc.put('/updateApp',Obj);
  }
  createAccount(Obj:any):Observable<any>{
    return this.hc.post('/createAccount',Obj);
  }

  getUserDetails(user:any):Observable<any>{
    return this.hc.get(`/details/${user}`);
  }

  verifyDetails(userObj:any):Observable<any>{
    let str=userObj.username+'-'+userObj.password;
    return this.hc.get(`/verify/${str}`);
  }
  
}
