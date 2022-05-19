import { Component, OnInit } from '@angular/core';

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
  public isPlayed: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  play(){
    if(this.isPlayed){
      this.isPlayed = false
    }else{
      this.isPlayed = true
    }
    return this.isPlayed;
  }

}
