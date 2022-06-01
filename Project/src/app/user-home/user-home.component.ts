import { Component, OnInit } from '@angular/core';
import { GlobalVarService } from '../global-var.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../rest.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { SidenavComponent } from '../sidenav/sidenav.component';

declare var $: any;

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home-html.component.html',
  styleUrls: ['progressbar.scss','user-home.scss'],
  styles: [
  ]
})
export class UserHomeComponent implements OnInit {
  public user: any;
  public items: any;
  public favAlbums: any;
  public artists:any;
  public playlists:any;
  public followedPlaylists:any;
  public myPlaylists:any;
  public followedArtists:any;
  public subMenuSong:boolean = false;

  // public subMenuSongCurrentSong:any;
  // public subMenuSongCurrentPlaylist:any;
  // public subMenuSongCurrentPosition:any;

  public subMenuData:any;

  public displaySong:boolean = false;
  public audio = new Audio();
  public currentPlaylist:any;
  public currentSong:any;
  public currentPosition:any;
  public songPath = this.globalVar.SONG_REPOSITORY;
  public isPlayed: boolean = false;
  public volumeMenu:boolean = false;
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

  constructor(private globalVar:GlobalVarService, private activeRoute:ActivatedRoute,
    private router: Router, private rest:RestService, private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    
    this.globalVar.init();
    this.user = this.globalVar.currentUser;

    this.getAllAlbums();
    this.getFollowedAlbums();
    this.getAllArtists();
    this.getAllPlaylists();
    this.getFollowedPlaylists();
    this.getMyPlaylist();
    this.getFollowedArtists();
  }

  getAllAlbums(){
    this.rest.get('/getAllAlbums').subscribe({
      next: res=>{
        console.log(res)
        this.items = res;
      },
      error: err=>{
        console.log(":C")
      }
    });
  }

  getFollowedAlbums(){
    this.rest.post('/getFollowedAlbums', {username:this.user.username}).subscribe({
      next: res=>{
        this.favAlbums = res;
        console.log(this.favAlbums);
      },
      error: err=>{
        console.log("piolan't")
      }
    });
  }

  getAllArtists(){
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
  getFollowedPlaylists(){
    this.rest.post('/getFollowedPlaylists', {username:this.user.username}).subscribe({
      next: res=>{
        console.log(res)
        this.followedPlaylists = res;
      },
      error: err=>{
        console.log(":C")
      }
    });
  }

  getAllPlaylists(){
    this.rest.post('/getAllPlaylists', {username:this.user.username}).subscribe({
      next: res=>{
        console.log(res)
        this.playlists = res;
      },
      error: err=>{
        console.log(":C")
      }
    });
  }

  getMyPlaylist(){
    this.rest.post('/getMyPlaylists',{username:this.user.username}).subscribe({
      next: res=>{
        console.log(res)
        this.myPlaylists = res;
      },
      error: err=>{
        console.log(err)
      }
    });
  }

  getFollowedArtists(){
    this.rest.post('/getFollowedArtists',{username:this.user.username}).subscribe({
      next: res=>{
        console.log(res)
        this.followedArtists = res;
      },
      error: err=>{
        console.log(err)
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
   * la añadira/quitara de favoritos dependiendo si estaba o
   * no en favoritos esa cancion
   * 
   * @returns void
   */
  addToFav(song:any){
    let data ={
      username: this.globalVar.currentUser.username,
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

  removeToFav(song:any){
    this.addToFav(song);
  }

  followAlbum(id:any){
    let data ={
      username: this.globalVar.currentUser.username,
      album_id: id,
    };
    this.rest.post('/followAlbum',data).subscribe({
      next: res=>{
        this.getFollowedAlbums();
      },
      error: err=>{
        console.log(err)
      }
    });
  }

  goToArtist(id:any){
    this.router.navigate(['home/artist/'+id]);
  }

  createPlaylist(){
    let data = {
      username: this.user.username,
      name: this.myPlaylists? 'My Playlist '+this.myPlaylists.length : 'My Playlist 0',
    } 
    this.rest.post('/createPlaylist', data).subscribe({
      next: res=>{
        this.getMyPlaylist();
      },
      error: err=>{
        console.log(err);
      }
    });
  }

  addToPlaylist(song:any, playlist:any){
    let data={
      username: this.user.username,
      song: song.song_id,
      playlist: playlist.playlist_id
    }
    this.rest.post('/addToPlaylist', data).subscribe({
      next: res=>{
        console.log(res)
      },
      error: err=>{
        console.log(err)  
      }
    });
    console.log(data)
    
  }
  removeToPlaylist(song:any, playlist:any){
    let data={
      username: this.user.username,
      song: song.song_id,
      playlist: playlist
    }
    this.rest.post('/removeToPlaylist', data).subscribe({
      next: res=>{
        console.log(res)
        /**@TODO refresh */
        this.router.navigate(['home/playlist/'+playlist]);
      },
      error: err=>{
        console.log(err)  
      }
    });
    console.log(data)
    
  }

  openSubMenu(songList:any, index:any, playlist_id:any, isMyPlaylist:any){
    this.subMenuDisplay();
    this.subMenuData ={
      playlist: songList,
      index: index,
      currentSong: songList[index],
      playlist_id: playlist_id,
      isMyPlaylist: isMyPlaylist
    }
    console.log(this.subMenuData)
  }

  subMenuDisplay(){
    if(this.subMenuSong){
      this.subMenuSong = false;
    }else{
      this.subMenuSong = true;
    }
    return this.subMenuSong;
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

  openVolume(){
    if(this.volumeMenu){
      this.volumeMenu = false;
    }else{
      this.volumeMenu = true;
    }
    console.log("Open:" +this.volumeMenu)
    return this.volumeMenu;

  }

  // ################# MUSIC ###################
  loadMusic(songList:any, index:any){
    this.currentPlaylist = songList;
    this.currentPosition = index;
    this.currentSong = this.currentPlaylist[this.currentPosition];
    $('body').addClass('current-song-body');
    this.load(this.currentSong);
  }
  load(song:any){

    // this.ngOnInit();
    // console.log(song);
    // this.userHome.showFooter(true);
    let me = this;
    // this.audio.removeEventListener("ended",this.addEnded);
    this.streamObserver(this.songPath+this.currentSong.file_name)
    .subscribe(event=>{});
    // this.addEnded();
    // this.audio.addEventListener("ended",this.addEnded);
    this.isPlayed = true;
    // this.audio.addEventListener("ended", this.next);
    // this.audio.src = this.songPath+this.currentSong.file_name;
    // this.audio.load();
    // this.play();
    // if(this.isPlayed){
    //   this.isPlayed = false
    // }else{
    //   this.isPlayed = true
    // }
    // return this.isPlayed;
    console.log("current song")
    console.log(this.currentSong)
    console.log(this.audio)
    // this.ngOnInit();
    
  }

  addEnded(){
    // let currentPlaylist = this.currentPlaylist;
    // let currentPosition = this.currentPosition;
    // let currentSong = this.currentSong;
    // let me = this;
    // this.audio.removeEventListener("ended",function(){
    //   console.log("end")
    //   me.next();
    // });
    // this.audio.addEventListener("ended",function(){
      console.log("end")
      this.next();
    // });
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
    console.log(this.currentPlaylist)
    console.log(this.currentPosition)
    console.log(this.currentSong)
    this.currentPosition++;
    if(this.currentPosition >= this.currentPlaylist.length){
      this.currentPosition = 0;
    }
    this.currentSong = this.currentPlaylist[this.currentPosition];
    this.load(this.currentSong);
  }

  back(){
    if(this.currentTimeInput > 2){
      this.audio.currentTime = 0;
      if(!this.isPlayed){
        this.play();
      }
    }else{
      this.currentPosition--;
      if(this.currentPosition < 0){
        this.currentPosition = this.currentPlaylist.length-1;
      }
      this.currentSong = this.currentPlaylist[this.currentPosition];
      this.load(this.currentSong);
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
      const nextSong = (event : Event)=>{
        this.next();
      }
      this.addEvent(this.audio,this.audioEvents,handler,nextSong);
      // this.audio.addEventListener("ended",this.next);

      return() =>{
        this.audio.pause();
        this.audio.currentTime = 0;
        this.removeEvent(this.audio, this.audioEvents, handler, nextSong);
      }
    });
  }
  addEvent(audio:any, events:Array<String>, handler:any, nextSong:any){
    events.forEach(event => {
      audio.addEventListener(event,handler);
    });
    audio.addEventListener("ended",nextSong);
  }
  removeEvent(audio:any, events:Array<String>, handler:any, nextSong:any){
    events.forEach(event => {
      audio.removeEventListener(event,handler);
    });
    audio.removeEventListener("ended", nextSong)
  }
  timeFormat(time:any, format='mm:ss'):string{
    const momentTime = time*1000;
    return moment.utc(momentTime).format(format);
  }

  setTime(event:any){
    this.audio.currentTime = event.target.value;
  }
}
