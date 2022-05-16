import { Component, OnInit } from '@angular/core';
import { GlobalVarService } from '../global-var.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav-html.component.html',
  styles: [
  ]
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

}
