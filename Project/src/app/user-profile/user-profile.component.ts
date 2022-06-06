import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
    private cookieService:CookieService) { }

  ngOnInit(): void {
    this.user = this.globalVar.currentUser;
    this.getImg();
    if(this.user.is_artist){
      this.getBanner();
    }
  }

  getImg(){
    this.rest.post('/getProfileImage',{username:this.user.username}).subscribe({
      next: res=>{
        this.img = res.profile_image;
      },
      error: err=>{
      }
    });
  }
  getBanner(){
    this.rest.post('/getBanner',{username:this.user.username}).subscribe({
      next: res=>{
        this.banner = res.banner;
      },
      error: err=>{
      }
    });
  }

  enableEdit(){
    if(this.edit){
      this.edit = false;
    }else{
      this.edit = true;
    }
    return this.edit;

  }
  update(data:NgForm){
    if(true){
      if(!this.check(data, this.user)){
        let editedUser = {
          oldUsername: this.globalVar.currentUser.username,
          user: data
        }
        this.rest.post('/editUser', editedUser).subscribe({
          next: res=>{
            this.globalVar.setCurrentUser(res);
            this.user = this.globalVar.currentUser;
            this.cookieService.deleteAll();
            this.cookieService.set('token_access', JSON.stringify(this.globalVar.currentUser),30,'/');

          },
          error: err=>{
          }
        })
        
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
    let data = {
      img : img.img,
      username: this.globalVar.currentUser.username
    }
    this.rest.post('/editProfileImage', data).subscribe({
      next: res=>{
      },
      error: err=>{
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
