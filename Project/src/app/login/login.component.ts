import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalVarService } from '../global-var.service'
import { RestService } from '../rest.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login-html.component.html',
  styles: [
  ]
})

export class LoginComponent implements OnInit {

  constructor( private globalVar: GlobalVarService, private restService: RestService,
    private cookieService: CookieService, private router:Router) {
  }

  ngOnInit(): void {
  }

  login(data: NgForm){

    if(true){

      this.restService.post('/login',data)
      .subscribe({
        next: res=>{
          this.globalVar.setCurrentUser(res);
          this.cookieService.set('token_access', JSON.stringify(this.globalVar.currentUser),5,'/');
          this.router.navigate(['/home']);
        },
        error: err =>{
        } 
      });
    }
  }

}
