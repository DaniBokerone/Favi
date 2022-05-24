import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { GlobalVarService } from '../global-var.service';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile-html.component.html',
  styleUrls:['profile.scss'],
  styles: [
  ]
})
export class UserProfileComponent implements OnInit {
  public user: any;
  public edit:boolean = false;
  public img:any;
  constructor(private globalVar: GlobalVarService, private rest:RestService,
    private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.user = this.globalVar.actualUser;
    this.getImg();
  }

  getImg(){
    this.rest.post('/getProfileImage',{username:this.user.username}).subscribe({
      next: res=>{
        this.img = res.profile_image;
        console.log("get img")
      },
      error: err=>{
        console.log(err);
      }
    });
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

  uploadImg(file:any){
    let actualFile = file.files[0];
    this.getB64(actualFile).then((img:any)=>{
      let imgBase = img.base.split('data:image/png;base64,')
      this.rest.post('/editProfileImage',{img: imgBase[1]}).subscribe({
        next: res=>{
          console.log(res)
          this.getImg();
        },
        error: err=>{
          console.log(err)
        }
      })
    })
  }

  getB64 = async ($event: any) => new Promise((resolve, _reject):any => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = _error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })


}
