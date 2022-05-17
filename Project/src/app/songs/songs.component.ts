import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-songs',
  templateUrl: 'songs-html.component.html',
  styleUrls:['songs.scss'],
  styles: [
  ]
})
export class SongsComponent implements OnInit {

  public song: any;

  constructor(private activeRoute: ActivatedRoute, private rest:RestService) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe({
      next: res =>{
        console.log(res)
        console.log("todo piola");
        this.rest.getWithParams('/getAlbum', res).subscribe({
          next: getRes=>{
            this.song = getRes;
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

}
