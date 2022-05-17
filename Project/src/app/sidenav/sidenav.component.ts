import { Component, OnInit } from '@angular/core';
import { GlobalVarService } from '../global-var.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { style } from '@angular/animations';

declare var $: any;
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav-html.component.html',
  styles:[]
 })
export class SidenavComponent implements OnInit {

  constructor(private globalVar: GlobalVarService, private coockieService: CookieService,
    private router:Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.coockieService.delete('token_access');
    this.router.navigate(['/login']);
  }

  closeSideNav(){
    let sideNav = $('#sideNav');
    if(sideNav.hasClass('closeSideNav')){
      sideNav.removeClass('closeSideNav');
    }else{
      sideNav.addClass('closeSideNav');
    }
    
  }

}
