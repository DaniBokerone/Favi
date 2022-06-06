import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GlobalVarService } from '../global-var.service';
import { HomeComponent } from '../home/home.component';
import { RestService } from '../rest.service';
import { UserHomeComponent } from '../user-home/user-home.component';

@Component({
  selector: 'app-search',
  templateUrl: 'search-html.component.html',
  styleUrls: ['./search.scss'],
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  public searchTypes = [
    {type: 0, name: 'All', default: true},
    {type: 1, name: 'Artists'},
    {type: 2, name: 'Songs'},
    {type: 3, name: 'Albums'},
    {type: 4, name: 'Playlists'}
  ];
  public typeToSearch:any = 0;
  public artists:any;
  public songs:any;
  public albums:any;
  public playlists:any;

  constructor(private rest:RestService, private globalVar:GlobalVarService,
    private userHome:UserHomeComponent) { }

  ngOnInit(): void {
  }

  setType(type:any){
    this.typeToSearch = type;
  }

  search(search:any){
    if(search.value.length > 0){
      let data = {
        search: search.value,
        type: this.typeToSearch,
        username: this.globalVar.currentUser.username
      }
      this.rest.post('/search', data).subscribe({
        next: res=>{
          this.artists = res.artists;
          this.songs = res.songs;
          this.albums = res.albums;
          this.playlists = res.playlists;
        },
        error: err=>{
        }
      });
    }else{
      setTimeout(()=>{
        this.artists = null;
        this.songs = null;
        this.albums = null;
        this.playlists = null;
      }, 1000);
    }
  }

  addToFav(song:any){
    this.userHome.addToFav(song);
    return song.fav = true;
  }
  removeToFav(song:any){
    this.userHome.removeToFav(song);
    return song.fav = false;
  }
  load(song:any){
    let songList = [song];
    this.userHome.loadMusic(songList, 0);

  }
  goToArtist(id:any){
    this.userHome.goToArtist(id);
  }
  
  openSubMenu(songList:any, index:any){
    this.userHome.openSubMenu(songList, index, null, false);
  }
}

