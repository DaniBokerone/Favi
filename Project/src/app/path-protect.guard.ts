import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class PathProtectGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router, private cookieService: CookieService){}

  reditect(logged:boolean){
    if(!logged){
      this.router.navigate(["/login"]);
    }
  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const cookie = this.cookieService.check("token_access");
      return cookie;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      const cookie = this.cookieService.check("token_access");
      this.reditect(cookie);
      return cookie;
  }


  
}
