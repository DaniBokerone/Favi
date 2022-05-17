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
    return this.http.post<any>(this.globalVar.API_SERVER+path, JSON.stringify(data));
  }

  public get(path:String){
    return this.http.get(this.globalVar.API_SERVER+path);
  }

  public getWithParams(path:String,params:any){
    /**@TODO */
    return this.http.get(this.globalVar.API_SERVER+path, {params: params});
  }
  
  
}
