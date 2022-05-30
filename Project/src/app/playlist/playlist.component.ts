import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalVarService } from '../global-var.service';
import { RestService } from '../rest.service';
import { UserHomeComponent } from '../user-home/user-home.component';

@Component({
  selector: 'app-playlist',
  templateUrl: '../songs/songs-html.component.html',
  styleUrls:['../songs/songs.scss'],
  styles: [
  ]
})
export class PlaylistComponent  implements OnInit {
  
  public album:any;
  public isFixed:boolean = false;

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
          this.rest.getWithParams('/getPlaylist', data).subscribe({
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
    addToFav(song:any){
      this.userHome.addToFav(song.song_id)
      return song.fav = true;
      
    }
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
  
    load(songList:any, index:any){
      console.log(songList)
      // this.globalVar.actualSong = song;
      this.userHome.loadMusic(songList, index);
  
    }
  
    play(){
      this.userHome.play();
    }
  
    pause(){
      this.userHome.pause();
    }

    openSubMenu(songList:any, index:any){
      this.userHome.openSubMenu(songList, index);
    }


}
