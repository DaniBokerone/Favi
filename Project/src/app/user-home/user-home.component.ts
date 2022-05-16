import { Component, OnInit } from '@angular/core';
import { GlobalVarService } from '../global-var.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home-html.component.html',
  styles: [
  ]
})
export class UserHomeComponent implements OnInit {
  public username:String | undefined;
  constructor(private globalVar:GlobalVarService, private coockieService: CookieService,
    private router: Router, private activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.username = this.globalVar.getNameUser();
    
  }

  showHome():boolean{
    return this.router.url == "/home";
  }
}
