import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from '../rest.service';

declare var $: any;
@Component({
  selector: 'app-register',
  templateUrl: './register-html.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private rest: RestService) {
  }

  ngOnInit(): void {
  }

  login(data: NgForm){
    if(true){
      this.rest.post('/register',data)
      .subscribe({
        next: res=>{
          this.router.navigate(['/login']);
        },
        error: err=>{
        }
      })
    }
  }
}
