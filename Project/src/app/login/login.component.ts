import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GlobalVarService } from '../global-var.service'
import { Observable } from 'rxjs';
import { RestService } from '../rest.service';
import { CookieService } from 'ngx-cookie-service';

declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login-html.component.html',
  styles: [
  ]
})

export class LoginComponent implements OnInit {
  // public form!: FormGroup;
  loginForm:any;
  item: any;
  userData: any={};
  //public allowedAccess: boolean | undefined;
  constructor(private http: HttpClient, private globalVar: GlobalVarService, private restService: RestService,
    private formBuilder: FormBuilder, private cookieService: CookieService, private router:Router) {
  }

  ngOnInit(): void {
    // this.form = this.formBuilder.group({
    //   username: [''],
    //   password: ['']
    // })
  }

  login(data: NgForm){

    // TODO : validaciones login
    if(true){

      this.restService.post('/login',data)
      .subscribe({
        next: res=>{
          console.log(res)
          this.globalVar.setActualUser(res);
          this.globalVar.setNameUser(res.username);
          this.cookieService.set('token_access',res.token,30,'/');
          this.router.navigate(['/home']);
        },
        error: err =>{
          console.log(err)
        } 
      });
    }
  }

}
