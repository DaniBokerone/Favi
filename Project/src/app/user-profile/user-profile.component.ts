import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { GlobalVarService } from '../global-var.service';
import { RestService } from '../rest.service';

declare var $: any;

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
    this.user = this.globalVar.actualUser;
    this.getImg();
    if(this.user.is_artist){
      this.getBanner();
    }
  }

  getImg(){
    // debugger
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
          oldUsername: this.globalVar.actualUser.username,
          user: data
        }
        console.log(editedUser)
        this.rest.post('/editUser', editedUser).subscribe({
          next: res=>{
            console.log(res)
            this.globalVar.setActualUser(res);
            this.user = this.globalVar.actualUser;
            this.cookieService.deleteAll();
            this.cookieService.set('token_access', JSON.stringify(this.globalVar.actualUser),30,'/');

          },
          error: err=>{
            console.log(err)
          }
        })
        console.log("cambios")
        
      }else{
        console.log("iguales")
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

  // onFileChange(event:any) {
  //   const reader = new FileReader();
     
  //   if(event.target.files && event.target.files.length) {
  //     const [file] = event.target.files;
  //     reader.readAsDataURL(file);
     
  //     reader.onload = () => {
    
  //       this.imageSrc = reader.result as string;
      
  //       this.myForm.patchValue({
  //         fileSource: reader.result
  //       });
    
  //     };
    
  //   }
  // }
  photo(img:any){  
    console.log(img)
    let data = {
      img : img.img,
      username: this.globalVar.actualUser.username
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
    fd.append("username", this.globalVar.actualUser.username);
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
    fd.append("username", this.globalVar.actualUser.username);
    fd.append("img", file.files[0]);
    let me = this;
    this.rest.postFile('/editBanner',fd).done(
      setTimeout(() => {
        me.getBanner();
      }, 200)
    );
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
