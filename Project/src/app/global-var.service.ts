import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class GlobalVarService {
  public API_SERVER = 'http://192.168.8.165/oda/api';
  // public API_SERVER = 'http://192.168.1.134/oda/api'; // <-- Mi server
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

  // public currentSong = {
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
    console.log(this.currentUser)
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
