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
    {type: 1, name: 'Artist'},
    {type: 2, name: 'Songs'},
    {type: 3, name: 'Albums'},
  ];
  public typeToSearch:any = 0;
  public artists:any;
  public songs:any;
  public albums:any;

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
        username: this.globalVar.actualUser.username
      }
      console.log(data)
      this.rest.post('/search', data).subscribe({
        next: res=>{
          console.log(res)
          this.artists = res.artists;
          this.songs = res.songs;
          this.albums = res.albums;
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
      }, 1000);
    }
  }

  addToFav(song:any){
    this.userHome.addToFav(song.id);
    return song.fav = true;
  }
  removeToFav(song:any){
    this.userHome.removeToFav(song.id);
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

