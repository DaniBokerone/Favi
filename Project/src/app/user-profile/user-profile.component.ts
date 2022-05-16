import { Component, OnInit } from '@angular/core';
import { GlobalVarService } from '../global-var.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile-html.component.html',
  styles: [
  ]
})
export class UserProfileComponent implements OnInit {
  public username:String | undefined;
  public user: any;
  constructor(private globalVar: GlobalVarService) { }

  ngOnInit(): void {
    this.username = this.globalVar.getNameUser();
    this.user = this.globalVar.actualUser;
  }

}
