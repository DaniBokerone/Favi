import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login-html.component.html',
  styles: [
  ]
})

export class LoginComponent implements OnInit {
  loginForm:any;
  userData: any={};
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    // $('h1').addClass('is-dark');
  }

  login(data: NgForm){
    this.userData = data;
    if(true){
      console.log(this.userData)
      //this.router.navigateByUrl('/');
    }
  }

}
