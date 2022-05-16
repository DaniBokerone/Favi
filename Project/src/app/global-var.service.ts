import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalVarService {
  public API_SERVER_TEST = 'https://reqres.in';
  public API_SERVER = 'http://192.168.8.165/oda/api';
  private nameUser: String | undefined;
  public actualUser = {
    username: "",
    name: "",
    lastname: "",
    email: "",
    birthday: "",
    image: "",
    isArtist: "",
    tlf: "",
  }
  constructor() { }

  setNameUser(nameUser:String | undefined){
    this.nameUser = nameUser;
  }
  getNameUser(){
    return this.nameUser;
  }

  setActualUser(user:any){
    this.actualUser.username = user.username;
    this.actualUser.name = user.name;
    this.actualUser.lastname= user.surname;
    this.actualUser.email= user.email;
    this.actualUser.birthday= user.birth_date;
    this.actualUser.image= user.profile_image;
    this.actualUser.isArtist= user.is_artist;
    this.actualUser.tlf= user.tlf;
  }
  

  logOut(){
    this.nameUser = undefined;

    this.actualUser.username = "";
    this.actualUser.name = "";
    this.actualUser.lastname= "";
    this.actualUser.email= "";
    this.actualUser.birthday= "";
    this.actualUser.image= "";
    this.actualUser.isArtist= "";
    this.actualUser.tlf= "";
  }
}
