import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVarService } from './global-var.service'

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http:HttpClient, private globalVar:GlobalVarService) { }

  public post(path:String,data: any){
    // return this.http.post<any>(this.globalVar.API_SERVER_TEST+"/api/users", data)
    return this.http.post<any>(this.globalVar.API_SERVER+path, JSON.stringify(data))
    // return {
    //   username: "usernametest",
    //   id: "001"
    // };
  }
  
  
}
