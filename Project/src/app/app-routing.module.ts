import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PathProtectGuard } from './path-protect.guard';
import { RegisterComponent } from './register/register.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PageNotFoundComponent } from './not-found/not-found.component';
import { SongsComponent } from './songs/songs.component';
import { MyFavSongsComponent } from './my-fav-songs/my-fav-songs.component';
import { ArtistProfileComponent } from './artist-profile/artist-profile.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { UploadAlbumComponent } from './upload-album/upload-album.component';
import { PlaylistComponent } from './playlist/playlist.component';

const routes: Routes = [

  {
    path:'',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: UserHomeComponent,
    canActivate: [PathProtectGuard],
    canActivateChild: [PathProtectGuard],
    children:[
    {
      path: 'profile',
      component: UserProfileComponent
    },
    {
      path: 'songs/:id',
      component: SongsComponent
    },
    {
      path: 'favSongs',
      component: MyFavSongsComponent
    },
    {
      path: 'artist/:id',
      component: ArtistProfileComponent
    },
    {
      path: 'search',
      component: SearchComponent
    },
    {
      path: 'upload',
      component: UploadAlbumComponent
    },
    {
      path: 'playlist/:id',
      component: PlaylistComponent
    }
  ]
  },
  


  
  {
    path: '**',
    component: PageNotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
