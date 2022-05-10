import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-register',
  templateUrl: './register-html.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {
  registerForm:any;
  registerData: any={};
  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  login(data: NgForm){
    this.registerData = data;
    if(true){
      console.log(this.registerData)
      //this.router.navigateByUrl('/');
    }
  }
}
