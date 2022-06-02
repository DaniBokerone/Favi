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
    console.log(type)
    this.typeToSearch = type;
  }

  search(search:any){
    if(search.value.length > 0){
      let data = {
        search: search.value,
        type: this.typeToSearch,
        username: this.globalVar.currentUser.username
      }
      console.log(data)
      this.rest.post('/search', data).subscribe({
        next: res=>{
          console.log(res)
          this.artists = res.artists;
          this.songs = res.songs;
          this.albums = res.albums;
          this.playlists = res.playlists;
        },
        error: err=>{
          console.log(err)
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
    console.log("ADD")
    console.log(song)
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
  
}

