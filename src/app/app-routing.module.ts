import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { InformationComponent } from './information/information.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [{path:'login',component:LoginComponent},
{path:'appointment',component:AppointmentComponent},
{path:'register',component:RegisterComponent},
{path:'information',component:InformationComponent},
{path:'home',component:HomeComponent},
{path:'aboutus',component:AboutusComponent},
{path:'details/:username',component:DetailsComponent},
{path:'',redirectTo:'/home',pathMatch:'full'},
{path:'**',component:PagenotfoundComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
