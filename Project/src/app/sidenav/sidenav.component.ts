import { Component, OnInit } from '@angular/core';
import { GlobalVarService } from '../global-var.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UserHomeComponent } from '../user-home/user-home.component';

declare var $: any;
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav-html.component.html',
  styleUrls:['side-nav.scss'],
  styles:[]
 })
export class SidenavComponent implements OnInit {

  public myPlaylists = this.userHome.myPlaylists;
  public favAlbums = this.userHome.favAlbums;
  public favArtist = this.userHome.followedArtists;
  public favPlaylists = this.userHome.followedPlaylists;
  public user:any;
  

  constructor(private globalVar: GlobalVarService, private userHome:UserHomeComponent) { }

  ngOnInit(): void {
    this.user = this.globalVar.currentUser;
    this.init();
    
  }
  init(){
    this.getPlaylists();
    this.getFavAlbums();
    this.getFavArtist();
    this.getFavPlaylists();
  }
  getPlaylists(){
    setTimeout(()=>{
      this.myPlaylists = this.userHome.myPlaylists;
    }, 100);
  }
  getFavAlbums(){
    setTimeout(()=>{
      this.favAlbums = this.userHome.favAlbums;
    }, 100);
  }
  getFavArtist(){
    setTimeout(()=>{
      this.favArtist = this.userHome.followedArtists;
    }, 100);
  }
  getFavPlaylists(){
    setTimeout(()=>{
      this.favPlaylists = this.userHome.followedPlaylists;
    }, 100);
  }

  logout(){
    this.userHome.logout();
  }

  closeSideNav(){
    let sideNav = $('#sideNav');
    if(sideNav.hasClass('closeSideNav')){
      sideNav.removeClass('closeSideNav');
    }else{
      sideNav.addClass('closeSideNav');
    }
    
  }

  createPlaylist(){
    this.userHome.createPlaylist();
  }

}
