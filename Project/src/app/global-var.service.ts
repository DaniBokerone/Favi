import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class GlobalVarService {
  public API_SERVER = 'http://192.168.8.165/oda/api';
  public SONG_REPOSITORY = 'http://192.168.8.165/oda/songs/';

  public currentUser = {
    user_id:"",
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
    this.setCurrentUser(data);
  }

  setCurrentUser(user:any){
    this.currentUser.user_id = user.user_id;
    this.currentUser.username = user.username;
    this.currentUser.name = user.name;
    this.currentUser.surname= user.surname;
    this.currentUser.email= user.email;
    this.currentUser.birth_date= user.birth_date;
    this.currentUser.is_artist= user.is_artist;
    this.currentUser.tlf= user.tlf;
  }

  logOut(){
    this.currentUser.user_id = "";
    this.currentUser.username = "";
    this.currentUser.name = "";
    this.currentUser.surname= "";
    this.currentUser.email= "";
    this.currentUser.birth_date= "";
    this.currentUser.is_artist= "";
    this.currentUser.tlf= "";
    this.coockieService.deleteAll();
  }
}
