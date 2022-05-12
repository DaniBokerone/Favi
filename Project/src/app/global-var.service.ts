import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalVarService {
  public API_SERVER_TEST = 'https://reqres.in';
  public API_SERVER = 'http://192.168.8.165/oda/api';
  public nameUser: String | undefined;

  constructor() { }

  setNameUser(nameUser:String){
    this.nameUser = nameUser;
  }

  logOut(){
    this.nameUser = undefined;
  }
}
