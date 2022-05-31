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
  public username:any;
  public isFixed:boolean = false;

  constructor(private activeRoute: ActivatedRoute, private rest:RestService,
    private globalVar: GlobalVarService, private userHome: UserHomeComponent) { }
  
    ngOnInit(): void {
      this.username = this.globalVar.actualUser.username;
      this.getPlaylist();
    }

    getPlaylist(){
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
      let data= {
        username: this.globalVar.actualUser.username,
        playlist_id: album.playlist_id
      };
      this.rest.post('/followPlaylist',data).subscribe({
        next: res=>{
          console.log("follow playlist")
        },
        error: err=>{
          console.log("No se puede follow")
        }
      });
      return album.follow = true;
    }
    unfollowAlbum(album:any){
      this.followAlbum(album);
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

    openSubMenu(songList:any, index:any, playlist_id:any, isMyPlaylist:any){
      this.userHome.openSubMenu(songList, index, playlist_id, isMyPlaylist);
    }

    
    publish(album:any){
      let data= {
        username: this.globalVar.actualUser.username,
        playlist_id: album.playlist_id,
        public: album.public? false : true
      };
      this.rest.post('/publishPlaylist',data).subscribe({
        next: res=>{
          console.log("public")
        },
        error: err=>{
          console.log(err)
        }
      });
      return album.public = true;
    }
    unpublish(album:any){
      this.publish(album);
      return album.public = false;
    }

    deletePlaylist(album:any){ 
      let data={
        username: this.username,
        playlist_id: album.playlist_id
      }
      this.rest.post('/deletePlaylist',data).subscribe({
        next: res=>{
          console.log("delete :D")
          /**@TODO redirecto home */
        },
        error: err=>{
          console.log(err)
        }
      });
    }

    uploadImg(file:any){
      let fd = new FormData();
      fd.append("username", this.globalVar.actualUser.username);
      fd.append("playlist_id", this.album.playlist_id);
      fd.append("img", file.files[0]);
      let me = this;
      this.rest.postFile('/editPlaylistImage',fd).done(
        setTimeout(() => {
          me.getPlaylist();
        }, 200)
      );
    }
    updatePlaylist(name:any){
      let data={
        username: this.username,
        playlist_id: this.album.playlist_id,
        name: name.playlistName
      }
      this.rest.post('/editPlaylist',data).subscribe({
        next: res=>{

        },
        error: err=>{
          console.log(err)
        }
      });
      
    }

}
