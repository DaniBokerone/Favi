import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalVarService } from '../global-var.service';
import { RestService } from '../rest.service';
import { UserHomeComponent } from '../user-home/user-home.component';

@Component({
  selector: 'app-artist-profile',
  templateUrl: 'artist-profile-html.component.html',
  styles: [
  ]
})
export class ArtistProfileComponent implements OnInit {

  public artist: any;

  constructor(private globalVar: GlobalVarService, private rest: RestService,
    private activeRoute: ActivatedRoute, private userHome: UserHomeComponent) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe({
      next: res =>{
        let data ={
          username: this.globalVar.actualUser.username,
          id: res["id"],
        };
        console.log("todo piola");
        this.rest.post('/getArtist', data).subscribe({
          next: getRes=>{
            this.artist = getRes;
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

  load(songList:any, index:any){
    console.log(songList)
    // this.globalVar.actualSong = song;
    this.userHome.loadMusic(songList, index);

  }

}
