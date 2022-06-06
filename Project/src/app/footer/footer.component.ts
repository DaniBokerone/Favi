import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer-html.component.html',
  styles: [`
  .footer{
    background-color:#bb86FC;
 }
 `]
})
export class FooterComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
  }
}
