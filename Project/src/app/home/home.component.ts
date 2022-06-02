import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home-html.component.html',
  template: `
    <p>
      home works!
    </p>
    <a routerLink="/register">register</a>
    <a routerLink="/login">login</a>
    
  `,
  styleUrls: ['home.scss'],
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
