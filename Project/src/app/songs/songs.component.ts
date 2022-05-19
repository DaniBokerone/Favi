import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalVarService } from '../global-var.service';
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
  public isFixed:boolean = false;

  constructor(private activeRoute: ActivatedRoute, private rest:RestService,
    private globalVar: GlobalVarService) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe({
      next: res =>{
        let data ={
          username: this.globalVar.actualUser.username,
          id: res["id"],
        };
        console.log("todo piola");
        this.rest.getWithParams('/getAlbum', data).subscribe({
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

  /**@TODO */
  @HostListener('window:scroll',['$event']) animationHeader(){
      if(window.scrollY>100){
        this.isFixed = true;
      }else{
        this.isFixed = false;
      }
  }

}
