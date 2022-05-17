import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PathProtectGuard } from './path-protect.guard';
import { RegisterComponent } from './register/register.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PageNotFoundComponent } from './not-found/not-found.component';
import { SongsComponent } from './songs/songs.component';

const routes: Routes = [

  {
    path:'',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: UserHomeComponent,
    canActivate: [PathProtectGuard],
    canActivateChild: [PathProtectGuard],
    children:[
    {
      path: 'profile',
      component: UserProfileComponent
    },
    {
      path: 'songs/:id',
      component: SongsComponent
    }
  ]
  },
  


  
  {
    path: '**',
    component: PageNotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
