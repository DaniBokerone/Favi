import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  public username = this.globalVar.currentUser.username;
  public isFixed:boolean = false;
  constructor(private activeRoute: ActivatedRoute, private rest:RestService,
    private globalVar: GlobalVarService, private userHome: UserHomeComponent,
    private router:Router) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe({
      next: res =>{
        let data ={
          username: this.globalVar.currentUser.username,
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
            this.router.navigate(['notfound404']);
          }
        });

      },
      error: err =>{
        console.log(err)
        this.router.navigate(['notfound404']);
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
   * pasando como parametro song
   * esta funcion devuelve un boolean que se guarda en
   * song.fav
   * 
   * @returns boolean
   */
  addToFav(song:any){
    this.userHome.addToFav(song)
    return song.fav = true;
    
  }

  /**
   * 
   * @param song JSON de la cancion
   * 
   * llamamos a la funcion de userHome.removeToFav
   * pasando como parametro song
   * esta funcion devuelve un boolean que se guarda en
   * song.fav
   * 
   * @returns boolean
   */
  removeToFav(song:any){
    this.userHome.removeToFav(song);
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
  
  publish(album:any){ }
  unpublish(album:any){ }

  goToArtist(id:any){
    this.userHome.goToArtist(id);
  }

  load(songList:any, index:any){
    console.log(songList)
    // this.globalVar.currentSong = song;
    this.userHome.loadMusic(songList, index);

  }

  play(){
    this.userHome.play();
  }

  pause(){
    this.userHome.pause();
  }
  deletePlaylist(album:any){ }
  uploadImg(file:any){ }
  updatePlaylist(name:any){ }

  openSubMenu(songList:any, index:any, playlist_id:any, isMyPlaylist:any){
    this.userHome.openSubMenu(songList, index, null, false);
  }

}
