import { Component, OnInit } from '@angular/core';
import { GlobalVarService } from '../global-var.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../rest.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { Observable } from 'rxjs';
import * as moment from 'moment';

declare var $: any;

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home-html.component.html',
  styleUrls: ['progressbar.scss'],
  styles: [
  ]
})
export class UserHomeComponent implements OnInit {
  public user: any;
  public items: any;
  public favAlbums: any;
  public artists:any;
  public displaySong:boolean = true; // <-- false
  public audio = new Audio();
  public actualPlaylist:any;
  public actualSong:any;
  public actualPosition:any;
  public songPath = this.globalVar.SONG_REPOSITORY;
  public isPlayed: boolean = false;
  duration = '';
  durationImput = 0;
  currentTime = '';
  currentTimeInput = 0;
  audioEvents = [
    // "ended",
    "error",
    "play",
    "playing",
    "pause",
    "timeupdate",
    "canplay",
    "loadedmetadata",
    "loadstart"
  ];
  removeAudioEvents = [
    "ended",
    "error",
    "play",
    "playing",
    "pause",
    "timeupdate",
    "canplay",
    "loadedmetadata",
    "loadstart"
  ];

  constructor(private globalVar:GlobalVarService, private coockieService: CookieService,
    private router: Router, private rest:RestService, private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    /**@TODO separar en metodos */
    this.globalVar.init();
    this.user = this.globalVar.actualUser;
    this.rest.get('/getAllAlbums').subscribe({
      next: res=>{
        console.log(res)
        this.items = res;
      },
      error: err=>{
        console.log(":C")
      }
    });
    this.rest.post('/getFollowedAlbums', {username:this.user.username}).subscribe({
      next: res=>{
        this.favAlbums = res;
        console.log(this.favAlbums);
      },
      error: err=>{
        console.log("piolan't")
      }
    });
    this.rest.get('/getAllArtists').subscribe({
      next: res=>{
        console.log(res)
        this.artists = res;
      },
      error: err=>{
        console.log(":C")
      }
    });
    
  }

  showHome():boolean{
    return this.router.url == "/home";
  }
  

  /**
   * 
   * @param song id de la cancion
   * 
   * prepara los datos en data, pasando como parametro
   * el "username" y "song_id" en JSON por POST llamamos a la API
   * 
   * @returns boolean
   */
  addToFav(song:any){
    let data ={
      username: this.globalVar.actualUser.username,
      song_id: song,
    };
    this.rest.post('/fav',data).subscribe({
      next: res =>{
        console.log("añadido a fav")
      },
      error: err=>{
        console.log("NO se ha podido añadir")
      }
    });
    

  }
  /**
   * 
   * @param song id de la cancion
   * 
   * prepara los datos en data, pasando como parametro
   * el "username" y "song_id" en JSON por POST llamamos a la API
   * 
   * @returns boolean
   */
  removeToFav(song:any){
    let data ={
      username: this.globalVar.actualUser.username,
      song_id: song,
    };
    this.rest.post('/fav',data).subscribe({
      next: res =>{
        console.log("quitado de fav")
      },
      error: err=>{
        console.log("NO se ha podido quitar")
      }
    });
  }

  followAlbum(id:any){
    let data ={
      username: this.globalVar.actualUser.username,
      album_id: id,
    };
    this.rest.post('/followAlbum',data).subscribe({
      next: res=>{
        console.log("follow album")
      },
      error: err=>{
        console.log("No se puede follow")
      }
    });
  }
  unfollowAlbum(id: any){
    let data ={
      username: this.globalVar.actualUser.username,
      album_id: id,
    };
    this.rest.post('/followAlbum',data).subscribe({
      next: res=>{
        console.log("unfollow album")
      },
      error: err=>{
        console.log("No se puede unfollow")
      }
    });
  }

  goToArtist(id:any){
    this.router.navigate(['home/artist/'+id]);
  }

  openSong(){
    if(this.displaySong){
      this.displaySong = false;
    }else{
      this.displaySong = true;
    }
    console.log("Open:" +this.displaySong)
    return this.displaySong;

  }

  // ################# MUSIC ###################
  loadMusic(songList:any, index:any){
    this.actualPlaylist = songList;
    this.actualPosition = index;
    this.actualSong = this.actualPlaylist[this.actualPosition];
    this.load(this.actualSong);
  }
  load(song:any){

    // this.ngOnInit();
    // console.log(song);
    // this.userHome.showFooter(true);
    this.streamObserver(this.songPath+this.actualSong.file_name)
    .subscribe(event=>{});
    this.addEnded();
    
    this.isPlayed = true;
    // this.audio.addEventListener("ended", this.next);
    // this.audio.src = this.songPath+this.actualSong.file_name;
    // this.audio.load();
    // this.play();
    // if(this.isPlayed){
    //   this.isPlayed = false
    // }else{
    //   this.isPlayed = true
    // }
    // return this.isPlayed;
    console.log("actual song")
    console.log(this.actualSong)
    console.log(this.audio)
    // this.ngOnInit();
    
  }

  addEnded(){
    let actualPlaylist = this.actualPlaylist;
    let actualPosition = this.actualPosition;
    let actualSong = this.actualSong;
    let me = this;
    // this.audio.removeEventListener("ended",function(){
    //   console.log("end")
    //   me.next();
    // });
    this.audio.addEventListener("ended",function(){
      console.log("end")
      me.next();
    });
  }

  play(){
    this.audio.play();
    this.isPlayed = true;
  }

  pause(){
    this.audio.pause();
    this.isPlayed = false;
  }

  next(){
    console.log(this.actualPlaylist)
    console.log(this.actualPosition)
    console.log(this.actualSong)
    this.actualPosition++;
    if(this.actualPosition >= this.actualPlaylist.length){
      this.actualPosition = 0;
    }
    this.actualSong = this.actualPlaylist[this.actualPosition];
    this.load(this.actualSong);
  }

  back(){
    if(this.currentTimeInput > 2){
      this.audio.currentTime = 0;
      if(!this.isPlayed){
        this.play();
      }
    }else{
      this.actualPosition--;
      if(this.actualPosition < 0){
        this.actualPosition = this.actualPlaylist.length-1;
      }
      this.actualSong = this.actualPlaylist[this.actualPosition];
      this.load(this.actualSong);
    }
    

  }

  setVolume(event:any){
    this.audio.volume = event.target.value;
  }
  streamObserver(url:any){
    return new Observable(observer =>{

      this.audio.src = url;
      this.audio.load();
      this.audio.play();
      

      const handler = (event: Event)=>{
        this.durationImput = this.audio.duration;
        this.duration= this.timeFormat(this.audio.duration);
        this.currentTimeInput = this.audio.currentTime;
        this.currentTime = this.timeFormat(this.audio.currentTime);
      }
      this.addEvent(this.audio,this.audioEvents,handler);
      // this.audio.addEventListener("ended",this.next);

      return() =>{
        this.audio.pause();
        this.audio.currentTime = 0;
        this.removeEvent(this.audio, this.removeAudioEvents, handler);
      }
    });
  }
  addEvent(audio:any, events:Array<String>, handler:any){
    events.forEach(event => {
      audio.addEventListener(event,handler);
    });
    // audio.addEventListener("ended",this.next);
  }
  removeEvent(audio:any, events:Array<String>, handler:any){
    events.forEach(event => {
      audio.removeEventListener(event,handler);
    });
  }
  timeFormat(time:any, format='mm:ss'):string{
    const momentTime = time*1000;
    return moment.utc(momentTime).format(format);
  }

  setTime(event:any){
    this.audio.currentTime = event.target.value;
  }
}
