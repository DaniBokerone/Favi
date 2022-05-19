import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalVarService } from '../global-var.service';
import { RestService } from '../rest.service';
import { UserHomeComponent } from '../user-home/user-home.component';


@Component({
  selector: 'app-songs',
  templateUrl: 'songs-html.component.html',
  styleUrls:['songs.scss'],
  styles: [
  ]
})
export class SongsComponent implements OnInit{

  public album: any;
  public isFixed:boolean = false;
  public songPath = this.globalVar.SONG_REPOSITORY;

  constructor(private activeRoute: ActivatedRoute, private rest:RestService,
    private globalVar: GlobalVarService, private userHome: UserHomeComponent) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe({
      next: res =>{
        let data ={
          username: this.globalVar.actualUser.username,
          id: res["id"],
        };
        console.log("todo piola");
        this.rest.getWithParams('/getAlbum', data).subscribe({
          next: getRes=>{
            this.album = getRes;
            console.log(getRes)
          },
          error: getErr=>{
            console.log(getErr)
          }
        });

      },
      error: err =>{
        console.log(err)
      }
    });
  }

  /**@TODO */
  @HostListener('window:scroll',['$event']) animationHeader(){
      if(window.scrollY>220){
        this.isFixed = true;
      }else{
        this.isFixed = false;
      }
  }
  /**
   * 
   * @param song JSON de la cancion
   * 
   * llamamos a la funcion de userHome.addTofav
   * pasando como parametro song.song_id (la id de la cancion)
   * esta funcion devuelve un boolean que se guarda en
   * song.fav
   * 
   * @returns boolean
   */
  addToFav(song:any){
    this.userHome.addToFav(song.song_id)
    return song.fav = true;
    
  }

  /**
   * 
   * @param song JSON de la cancion
   * 
   * llamamos a la funcion de userHome.removeToFav
   * pasando como parametro song.song_id (la id de la cancion)
   * esta funcion devuelve un boolean que se guarda en
   * song.fav
   * 
   * @returns boolean
   */
  removeToFav(song:any){
    this.userHome.removeToFav(song.song_id);
    return song.fav = false;
  }

  followAlbum(album:any){
    this.userHome.followAlbum(album.album_id);
    return album.follow = true;
  }
  unfollowAlbum(album:any){
    this.userHome.followAlbum(album.album_id);
    return album.follow = false;
  }

  goToArtist(id:any){
    this.userHome.goToArtist(id);
  }

  play(file:any){
    let audio = new Audio();
    audio.src = this.globalVar.SONG_REPOSITORY+file;
    audio.load();
    audio.play();
  }

}
