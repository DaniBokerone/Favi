import { Component, OnInit } from '@angular/core';
import { GlobalVarService } from '../global-var.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../rest.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

declare var $: any;

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home-html.component.html',
  styles: [
  ]
})
export class UserHomeComponent implements OnInit {
  public user: any;
  public items: any;
  public favAlbums: any;
  public test: any;

  constructor(private globalVar:GlobalVarService, private coockieService: CookieService,
    private router: Router, private rest:RestService, private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.globalVar.init();
    this.user = this.globalVar.actualUser;
    this.rest.get('/getAllAlbums').subscribe({
      next: res=>{
        console.log(res)
        this.items = res;
      },
      error: err=>{
        console.log(":C")
      }
    });
    this.rest.post('/getFollowedAlbums', {username:this.user.username}).subscribe({
      next: res=>{
        this.favAlbums = res;
        console.log(this.favAlbums);
      },
      error: err=>{
        console.log("piolan't")
      }
    });
    
  }

  showHome():boolean{
    return this.router.url == "/home";
  }

  /**
   * 
   * @param song id de la cancion
   * 
   * prepara los datos en data, pasando como parametro
   * el "username" y "song_id" en JSON por POST llamamos a la API
   * 
   * @returns boolean
   */
  addToFav(song:any){
    let data ={
      username: this.globalVar.actualUser.username,
      song_id: song,
    };
    this.rest.post('/fav',data).subscribe({
      next: res =>{
        console.log("añadido a fav")
      },
      error: err=>{
        console.log("NO se ha podido añadir")
      }
    });
    

  }
  /**
   * 
   * @param song id de la cancion
   * 
   * prepara los datos en data, pasando como parametro
   * el "username" y "song_id" en JSON por POST llamamos a la API
   * 
   * @returns boolean
   */
  removeToFav(song:any){
    let data ={
      username: this.globalVar.actualUser.username,
      song_id: song,
    };
    this.rest.post('/fav',data).subscribe({
      next: res =>{
        console.log("quitado de fav")
      },
      error: err=>{
        console.log("NO se ha podido quitar")
      }
    });
  }

  followAlbum(id:any){
    let data ={
      username: this.globalVar.actualUser.username,
      album_id: id,
    };
    this.rest.post('/followAlbum',data).subscribe({
      next: res=>{
        console.log("follow album")
      },
      error: err=>{
        console.log("No se puede follow")
      }
    });
  }
  unfollowAlbum(id: any){
    let data ={
      username: this.globalVar.actualUser.username,
      album_id: id,
    };
    this.rest.post('/followAlbum',data).subscribe({
      next: res=>{
        console.log("unfollow album")
      },
      error: err=>{
        console.log("No se puede unfollow")
      }
    });
  }

  goToArtist(id:any){
    this.rest.post('/getArtist',{artist_id: id}).subscribe({
      next: res=>{
        console.log(res)
        this.router.navigate(['artist/'+id]);
      },
      error: err=>{
        console.log(err)
      }
    });
  }
  

}
