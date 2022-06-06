import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalVarService } from '../global-var.service';
import { RestService } from '../rest.service';
import { UserHomeComponent } from '../user-home/user-home.component';

@Component({
  selector: 'app-artist-profile',
  templateUrl: 'artist-profile-html.component.html',
  styleUrls: ['./artist-profile.scss'],
  styles: [
  ]
})
export class ArtistProfileComponent implements OnInit {

  public artist: any;
  public username: any;

  constructor(private globalVar: GlobalVarService, private rest: RestService,
    private activeRoute: ActivatedRoute, private userHome: UserHomeComponent,
    private router:Router) { }

  ngOnInit(): void {
    this.username = this.globalVar.currentUser.username;
    this.activeRoute.params.subscribe({
      next: res =>{
        let data ={
          username: this.globalVar.currentUser.username,
          id: res["id"],
        };
        this.rest.post('/getArtist', data).subscribe({
          next: getRes=>{
            this.artist = getRes;
            
          },
          error: getErr=>{
            this.router.navigate(['notfound404']);
          }
        });

      },
      error: err =>{
        this.router.navigate(['notfound404']);
      }
    });
  }

  load(songList:any, index:any){
    this.userHome.loadMusic(songList, index);

  }
  goTo(id:any){
    this.router.navigate(['/home/songs/'+id]);
  }

  followArtist(artist:any){
    let data ={
      username: this.username,
      artist_id: artist.artist_id
    }
    this.rest.post('/followArtist',data).subscribe({
      next: res=>{
        this.userHome.getFollowedArtists();
      },
      error: err=>{
      }
    });
    return artist.fav = true;
  }
  unfollowArtist(artist:any){
    this.followArtist(artist);
    return artist.fav = false;
  }
  addToFav(song:any){
    this.userHome.addToFav(song)
    return song.fav = true;
    
  }

  removeToFav(song:any){
    this.userHome.removeToFav(song);
    return song.fav = false;
  }

  openSubMenu(songList:any, index:any, playlist_id:any, isMyPlaylist:any){
    this.userHome.openSubMenu(songList, index, null, false);
  }

}
