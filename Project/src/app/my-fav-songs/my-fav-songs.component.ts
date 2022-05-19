import { Component, HostListener, OnInit } from '@angular/core';
import { GlobalVarService } from '../global-var.service';
import { RestService } from '../rest.service';
import { SongsComponent } from '../songs/songs.component';
import { UserHomeComponent } from '../user-home/user-home.component';

@Component({
  selector: 'app-my-fav-songs',
  templateUrl: '../songs/songs-html.component.html',
  styleUrls:['../songs/songs.scss'],
  styles: [
  ]
})
export class MyFavSongsComponent implements OnInit {

  public album: any;
  public isFixed:boolean = false;
  public songPath = this.globalVar.SONG_REPOSITORY;

  constructor(private rest:RestService, private globalVar: GlobalVarService,
    private userHome:UserHomeComponent) { }

  ngOnInit(): void {
    let data = {username: this.globalVar.actualUser.username}
    this.rest.post('/favAlbum', data).subscribe({
      next: res =>{
        console.log(res)
        this.album = res;
      },
      error: err=>{

      }
    })
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

  play(file:any){
    // ta mal :(
    let audio = new Audio();
    audio.src = this.globalVar.SONG_REPOSITORY+file;
    audio.load();
    audio.play();
  }
}
