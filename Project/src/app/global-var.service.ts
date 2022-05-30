import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class GlobalVarService {
  public API_SERVER = 'http://192.168.8.165/oda/api';
  // public API_SERVER = 'http://192.168.1.134/oda/api'; // <-- Mi server
  public SONG_REPOSITORY = 'http://192.168.8.165/oda/songs/';

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

  // public actualSong = {
  //   album_id: '',
  //   artist_id: '',
  //   artist_name: '',
  //   collaborators: '',
  //   cover_img: '',
  //   duration: '',
  //   fav: '',
  //   file_name: '',
  //   name: '',
  //   release_date: '',
  //   song_id: '',

  // }
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
    this.actualUser.is_artist= "";
    this.actualUser.tlf= "";
    this.coockieService.deleteAll();
  }
}
