import { Component, OnInit } from '@angular/core';
import { GlobalVarService } from '../global-var.service';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-upload-album',
  templateUrl: 'upload-album-html.component.html',
  styleUrls: ['upload-album.scss'],
  styles: [
  ]
})
export class UploadAlbumComponent implements OnInit {

  public filesToUpload:any;
  public filesToUploadTime:any=[];
  public coverAlbum:any;
  public coverAlbumImage:any;
  public idAlbum:any;
  public idSongs:any;
  public phase = 1;

  constructor(private globalVar:GlobalVarService, private rest:RestService) { }

  ngOnInit(): void {
  }

  uploadSongs(files:any){
    this.filesToUpload = files.files;
    for(let i = 0; i<this.filesToUpload.length;i++){
        this.getTime(files.files[i]);
      
    }
    console.log(this.filesToUpload)
  }
  uploadCoverALbum(files:any){
    this.coverAlbum = files.files[0];
    this.getB64(files.files[0]).then((img:any)=>{
      this.coverAlbumImage = img.base;
    })
  }

  uploadAlbum(album:any){
    let fd = new FormData();
    fd.append("username", this.globalVar.currentUser.username);
    fd.append("album_name", album.nameAlbum);
    fd.append("cover_image", this.coverAlbum);
    this.rest.postFile('/add_albums/addAlbum', fd).done((res:any)=>{
      this.idAlbum = res;
      console.log(res);
      this.phase = 2;
    });
    
  }

  uploadSongsConfirm(){
    console.log(this.filesToUploadTime)
    let fd = new FormData();
    fd.append("username", this.globalVar.currentUser.username);
    fd.append("album_id", this.idAlbum);
    for(let i=0;i<this.filesToUpload.length;i++){
      fd.append("song_"+i, this.filesToUpload[i]);
      fd.append("time_"+i, this.filesToUploadTime[i]);
    }
    fd.append("total_songs", this.filesToUpload.length);
    this.rest.postFile('/add_albums/uploadAlbumSongs', fd).done((res:any)=>{
      console.log(res)
      this.idSongs = JSON.parse(res);
      this.phase = 3;
    });
    
  }
  getTime(song:any){
    let audioUrl = URL.createObjectURL(song); 
    let audio = new Audio(audioUrl);
    let duration = 0;
    let me = this;
    audio.addEventListener('canplaythrough', function(e:any){ 
      
      
      duration = Math.round(e.currentTarget.duration);
      me.filesToUploadTime.push(duration);
    }); 
  }
  

  uploadNameSongs(nameSongs:any){
    
    let arr=[];
    for(let i=0; i<this.idSongs.length;i++){
      arr.push({
        id: this.idSongs[i]['song_id_'+i],
        name: nameSongs['namesong'+i]
      });
    }
    let data = {
      username: this.globalVar.currentUser.username,
      album_id: this.idAlbum,
      names: arr
    }
    console.log(data)
    console.log(nameSongs)
    this.rest.post('/add_albums/uploadAlbumNames', data).subscribe({
      next: res=>{
        this.phase = 4;
      },
      error: err=>{
        console.log(err);
      }
    });

  }
  
  publish(){
    let data = {
      username: this.globalVar.currentUser.username,
      album_id: this.idAlbum
    }
    this.rest.post('/add_albums/publish',data).subscribe({
      next: res=>{
        this.phase = 5;
      },
      error: err=>{
        console.log(err);
      }
    });
  }

  cancelUpload(){
    let data = {
      username: this.globalVar.currentUser.username,
      album_id: this.idAlbum
    }
    this.rest.post('/add_albums/deleteAlbum',data).subscribe({
      next: res=>{
        this.phase = 1;
      },
      error: err=>{
        console.log(err);
      }
    });
  }

  // uploadAlbum(album:any){
  //   let fdFiles = new FormData();
  //   let data = {
  //     username: this.globalVar.currentUser.username,
  //     album_name: album.nameAlbum
  //   }

  //   let fd = new FormData();
  //   // fd.append("cover_album", album.coverAlbum)
  //   // fd.append("album_name", album.nameAlbum)
  //   fdFiles.append("username", this.globalVar.currentUser.username);
  //   fd.append("username", this.globalVar.currentUser.username);
    
    
  //   for(let i=0;i<this.filesToUpload.length;i++){
  //     fdFiles.append("song-"+i, this.filesToUpload[i])
  //     fd.append("namesong-"+i, (<HTMLInputElement>document.getElementById("namesong"+i)).value)

      
  //   }
    
  //   // fd.append("songs_files", arrayFiles);
  // //   for (var pair in fd.values()) {
  // //     console.log(pair[0]+ ', ' + pair[1]); 
  // // }
  // this.rest.postFile('/createAlbum',fd).done(
  //   setTimeout(() => {
  //     // me.getBanner();
  //   }, 200)
  // );
  // let me = this;
  //   this.rest.postFile('/uploadFiles',fdFiles).done(
  //     setTimeout(() => {
  //       // me.getBanner();
  //     }, 200)
  //   );
    
  //   console.log(album)
  // }
      

  getB64 = async ($event: any) => new Promise((resolve, _reject):any => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = _error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })
}
