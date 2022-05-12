import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GlobalVarService } from '../global-var.service'
import { Observable } from 'rxjs';
import { RestService } from '../rest.service';

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
  
  constructor(private http: HttpClient, private globalVar: GlobalVarService, private rest: RestService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    // this.form = this.formBuilder.group({
    //   username: [''],
    //   password: ['']
    // })
  }

  login(data: NgForm){
    // this.userData = data;
    // console.log(JSON.stringify(data))
    // mirar submit
    if(true){
       const headers = new Headers();
        headers.append('Content-Type', 'application/json');
      this.rest.post(
        // {
        // name: this.form.value.username,
        // job: this.form.value.password
        
      // }
      data)
      .subscribe(res=>{
        // this.form.reset();
        console.log(":D");
        console.log(res)
      });
      // this.http.post<any>(this.globalVar.API_SERVER+"/prueba.php", JSON.stringify(data)).subscribe(data =>{
      //   console.log("post")
      //   console.log(data)
      //   // this.item = data;
      //   // console.log(this.item.name)
      // });

      // $.http({
      //   method:"POST",
      //       url: "http://192.168.8.165/oda/api/prueba.php",
      //       data: $.param(data)
      //   }).success(function(data: any, status: any, headers: any, config: any){
      //       console.log(data);
      //   }).error(function(data: any, status: any, headers:any, config:any){
      //       console.log(status);
      //   });
        // $.ajax({
        //   type: "POST",
        //   url: "http://192.168.8.165/oda/api/prueba.php",
        //   data: data,
        //   success: (data:any)=>{
        //     console.log("asd");
        //     console.log(data)
        //   }
        // });
        // function success(data:any){
        //   console.log("uwu")
        //   console.log(data)
        // }
        // $.post( "http://192.168.8.165/oda/api/prueba.php", function( data:any ) {
        //   console.log(data)
        // });
      // console.log("API response: ")
      // //console.log(a)
      // console.log(this.userData)
      
      //this.router.navigateByUrl('/');
    }
  }

}
