import { Component, OnInit } from '@angular/core';
import { GlobalVarService } from '../global-var.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../rest.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home-html.component.html',
  styles: [
  ]
})
export class UserHomeComponent implements OnInit {
  public user: any;
  public items: any;
  public test: any;
  constructor(private globalVar:GlobalVarService, private coockieService: CookieService,
    private router: Router, private rest:RestService, private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.globalVar.init();
    this.user = this.globalVar.actualUser;
    this.rest.get('/getAllAlbums').subscribe({
      next: res=>{
        console.log(res)
        this.items = res;
        // for(let item of this.items){
        //   item.cover_image = this.sanitizer.bypassSecurityTrustResourceUrl(
        //   'data:image/jpeg;base64,' + this.items.cover_image);
        //   console.log(item)
        // }
        // let objectURL = 'data:image/jpeg;base64,' + this.items.cover_image;
        // this.test = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        
      },
      error: err=>{
        console.log(":C")
      }
    });
    
  }

  showHome():boolean{
    return this.router.url == "/home";
  }

}
