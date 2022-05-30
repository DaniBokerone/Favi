import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PageNotFoundComponent } from './not-found/not-found.component';
import { SongsComponent } from './songs/songs.component';
import { MyFavSongsComponent } from './my-fav-songs/my-fav-songs.component';
import { ArtistProfileComponent } from './artist-profile/artist-profile.component';
import { SearchComponent } from './search/search.component';
import { UploadAlbumComponent } from './upload-album/upload-album.component';
import { PlaylistComponent } from './playlist/playlist.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    SidenavComponent,
    UserHomeComponent,
    UserProfileComponent,
    PageNotFoundComponent,
    SongsComponent,
    MyFavSongsComponent,
    ArtistProfileComponent,
    SearchComponent,
    UploadAlbumComponent,
    PlaylistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [CookieService/*,{provide: LocationStrategy, useClass: HashLocationStrategy}*/],
  bootstrap: [AppComponent]
})
export class AppModule { }

