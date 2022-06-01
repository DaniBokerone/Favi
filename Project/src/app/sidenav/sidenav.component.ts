import { Component, OnInit } from '@angular/core';
import { GlobalVarService } from '../global-var.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { style } from '@angular/animations';
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
  

  constructor(private globalVar: GlobalVarService, private coockieService: CookieService,
    private router:Router, private userHome:UserHomeComponent) { }

  ngOnInit(): void {
    this.init();
    
  }
  init(){
    this.getPlaylists();
    this.getFavAlbums();
    this.getFavArtist();
  }
  getPlaylists(){
    setTimeout(()=>{
      this.myPlaylists = this.userHome.myPlaylists;
    }, 200);
  }
  getFavAlbums(){
    setTimeout(()=>{
      this.favAlbums = this.userHome.favAlbums;
    }, 200);
  }
  getFavArtist(){
    setTimeout(()=>{
      this.favArtist = this.userHome.followedArtists;
    }, 200);
  }

  logout(){
    this.coockieService.delete('token_access');
    this.router.navigate(['/login']);
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
