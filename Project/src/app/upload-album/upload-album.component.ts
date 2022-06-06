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
      this.phase = 2;
    });
    
  }

  uploadSongsConfirm(){
    let fd = new FormData();
    fd.append("username", this.globalVar.currentUser.username);
    fd.append("album_id", this.idAlbum);
    for(let i=0;i<this.filesToUpload.length;i++){
      fd.append("song_"+i, this.filesToUpload[i]);
    }
    fd.append("total_songs", this.filesToUpload.length);
    this.rest.postFile('/add_albums/uploadAlbumSongs', fd).done((res:any)=>{
      this.idSongs = JSON.parse(res);
      this.phase = 3;
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
    this.rest.post('/add_albums/uploadAlbumNames', data).subscribe({
      next: res=>{
        this.phase = 4;
      },
      error: err=>{
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
      }
    });
  }
  
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
