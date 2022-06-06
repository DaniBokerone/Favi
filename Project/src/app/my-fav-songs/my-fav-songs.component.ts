import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  public username = this.globalVar.currentUser.username;
  public songPath = this.globalVar.SONG_REPOSITORY;
  public audio = new Audio();

  constructor(private rest:RestService, private globalVar: GlobalVarService,
    private userHome:UserHomeComponent, private router:Router) { }

  ngOnInit(): void {
    let data = {username: this.globalVar.currentUser.username}
    this.rest.post('/favAlbum', data).subscribe({
      next: res =>{
        this.album = res;
      },
      error: err=>{
        this.router.navigate(['notfound404']);
      }
    })
  }

  @HostListener('window:scroll',['$event']) animationHeader(){
    if(window.scrollY>220){
      this.isFixed = true;
    }else{
      this.isFixed = false;
    }
}
  addToFav(song:any){
    this.userHome.addToFav(song)
    return song.fav = true;
    
  }

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
  unpublish(album:any){  }

  goToArtist(id:any){
    this.userHome.goToArtist(id);
  }

  load(songList:any, index:any){
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
