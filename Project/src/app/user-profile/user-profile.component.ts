import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GlobalVarService } from '../global-var.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile-html.component.html',
  styles: [
  ]
})
export class UserProfileComponent implements OnInit {
  public user: any;
  public edit:boolean = false;
  constructor(private globalVar: GlobalVarService) { }

  ngOnInit(): void {
    this.user = this.globalVar.actualUser;
  }

  enableEdit(){
    if(this.edit){
      this.edit = false;
    }else{
      this.edit = true;
    }
    console.log("Enable edit:" +this.edit)
    return this.edit;

  }
  update(data:NgForm){
    // TODO validaciones
    if(true){
      if(this.check(data, this.user)){
        console.log("iguales")
        
      }else{
        console.log("cambios")
        /**@TODO update user */
      }
    }
  }
  /**
   * 
   * @param editUser Usuario que hemos editado
   * @param user Datos del usuario logeado
   * @description
   * Miramos si hemos editado algun campo del
   * usuario para hacer la llamada a la API,
   * si se ha editado devuelve faslse, si no
   * se ha editado ningun campo devuelve true
   * @returns boolean
   */
  check(editUser:any, user:any) {
    const keys1 = Object.keys(editUser);
    for (let key of keys1) {
      if (editUser[key] !== user[key]) {
        return false;
      }
    }
    return true;
  }

}
