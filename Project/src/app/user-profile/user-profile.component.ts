import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
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
  public banner:any;
  constructor(private globalVar: GlobalVarService, private rest:RestService,
    private sanitizer:DomSanitizer, private cookieService:CookieService) { }

  ngOnInit(): void {
    this.user = this.globalVar.currentUser;
    console.log(this.user)
    this.getImg();
    if(this.user.is_artist){
      this.getBanner();
    }
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
  getBanner(){
    this.rest.post('/getBanner',{username:this.user.username}).subscribe({
      next: res=>{
        this.banner = res.banner;
        console.log("get banner")
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
      if(!this.check(data, this.user)){
        let editedUser = {
          oldUsername: this.globalVar.currentUser.username,
          user: data
        }
        console.log(editedUser)
        this.rest.post('/editUser', editedUser).subscribe({
          next: res=>{
            console.log(res)
            this.globalVar.setCurrentUser(res);
            this.user = this.globalVar.currentUser;
            this.cookieService.deleteAll();
            this.cookieService.set('token_access', JSON.stringify(this.globalVar.currentUser),30,'/');

          },
          error: err=>{
            console.log(err)
          }
        })
        console.log("cambios")
        
      }else{
        console.log("iguales")
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

  photo(img:any){  
    console.log(img)
    let data = {
      img : img.img,
      username: this.globalVar.currentUser.username
    }
    this.rest.post('/editProfileImage', data).subscribe({
      next: res=>{
        console.log(res)
      },
      error: err=>{
        console.log(err)
      }
    })
    
  }

  uploadImg(file:any){
    let fd = new FormData();
    fd.append("username", this.globalVar.currentUser.username);
    fd.append("img", file.files[0]);
    let me = this;
    this.rest.postFile('/editProfileImage',fd).done(
      setTimeout(() => {
        me.getImg();
      }, 200)
    );
  }

  uploadBanner(file:any){
    let fd = new FormData();
    fd.append("username", this.globalVar.currentUser.username);
    fd.append("img", file.files[0]);
    let me = this;
    this.rest.postFile('/editBanner',fd).done(
      setTimeout(() => {
        me.getBanner();
      }, 200)
    );
  }
}
