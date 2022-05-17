import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
  <div class="footer">
    <p>
      footer works!
    </p>
  <div>
  `,
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
