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
  public user: any;
  constructor(private globalVar:GlobalVarService, private coockieService: CookieService,
    private router: Router) { }

  ngOnInit(): void {
    this.globalVar.init();
    this.user = this.globalVar.actualUser;
    
  }

  showHome():boolean{
    return this.router.url == "/home";
  }
}
