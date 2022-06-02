import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { GlobalVarService } from '../global-var.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found-html.component.html',
  styleUrls:['not-found.scss'],
  styles: [
  ]
})
export class PageNotFoundComponent implements OnInit {

  public isLogged:any;

  constructor(private globalVar:GlobalVarService, private cookie:CookieService) { }

  ngOnInit(): void {
    this.isLogged = this.cookie.check("token_access");
  }

}
