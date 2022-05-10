import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login-html.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginObj: any;
  constructor(private router: Router) {
    this.loginObj = {
      username: '',
      password: ''
    };
  }

  ngOnInit(): void {
  }

  login(){
    if(true){
      this.router.navigateByUrl('/');
    }
  }

}
