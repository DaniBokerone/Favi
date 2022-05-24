import { Component, OnInit } from '@angular/core';
import { GlobalVarService } from '../global-var.service';
import { UserHomeComponent } from '../user-home/user-home.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer-html.component.html',
  styleUrls:['./progressbar.scss'],
  styles: [`
  .footer{
    background-color:#bb86FC;
 }
 `]
})
export class FooterComponent implements OnInit {
//   public isPlayed: boolean = false;
//   public songPath = this.globalVar.SONG_REPOSITORY;
// //   public actualSong={
// //     album_id: "3",
// // artist_id: "1",
// // artist_name: "Aitor",
// // collaborators: null,
// // cover_img: '',
// // duration: "05:41",
// // fav: true,
// // file_name: "ALIEN.mp3",
// // name: "ALIEN",
// // release_date: "2022-05-18 17:26:35",
// // song_id: "2",
// //   };
//   public actualSong= this.globalVar.actualSong;
//   public audio = new Audio();
  
  constructor() { }

  ngOnInit(): void {
    // this.actualSong = this.globalVar.actualSong;
  }

//   // play(){
//   //   if(this.isPlayed){
//   //     this.isPlayed = false
//   //   }else{
//   //     this.isPlayed = true
//   //   }
//   //   return this.isPlayed;
//   // }  
//   load(){
//     this.ngOnInit();
//     // console.log(song);
//     this.userHome.showFooter(true);
//     // this.actualSong = song;
//     this.audio.src = this.songPath+this.actualSong.file_name;
//     this.audio.load();
//     this.play();
//     // if(this.isPlayed){
//     //   this.isPlayed = false
//     // }else{
//     //   this.isPlayed = true
//     // }
//     // return this.isPlayed;
//     console.log("actual song")
//     console.log(this.actualSong)
//     console.log(this.audio)
//     this.ngOnInit();
    
//   }

//   play(){
//     this.audio.play();
//   }

//   pause(){
//     this.audio.pause();
//   }
//   setVolume(event:any){
//     console.log(event.target.value)
//     console.log(this.audio)
//     this.audio.volume = event.target.value;
//   }
//   testing(){
//     console.log(this.actualSong);
//     console.log(this.audio)
//   }
}
