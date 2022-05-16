import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class GlobalVarService {
  public API_SERVER_TEST = 'https://reqres.in';
  public API_SERVER = 'http://192.168.8.165/oda/api';

  public actualUser = {
    username: "",
    name: "",
    surname: "",
    email: "",
    birth_date: "",
    profile_image: "",
    is_artist: "",
    tlf: "",
  }
  constructor(private coockieService: CookieService) { }

  init(){
    
    var coockie = this.coockieService.get("token_access");
    var data = JSON.parse(coockie)
    console.log(data)
    this.setActualUser(data);
  }

  setActualUser(user:any){
    this.actualUser.username = user.username;
    this.actualUser.name = user.name;
    this.actualUser.surname= user.surname;
    this.actualUser.email= user.email;
    this.actualUser.birth_date= user.birth_date;
    this.actualUser.profile_image= user.profile_image;
    this.actualUser.is_artist= user.is_artist;
    this.actualUser.tlf= user.tlf;
    console.log(this.actualUser)
  }
  

  logOut(){
    this.actualUser.username = "";
    this.actualUser.name = "";
    this.actualUser.surname= "";
    this.actualUser.email= "";
    this.actualUser.birth_date= "";
    this.actualUser.profile_image= "";
    this.actualUser.is_artist= "";
    this.actualUser.tlf= "";
  }
}
