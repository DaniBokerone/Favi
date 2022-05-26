import { Component, OnInit } from '@angular/core';
import { GlobalVarService } from '../global-var.service';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-search',
  templateUrl: 'search-html.component.html',
  template: `
    <p>
      search works!
    </p>
  `,
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  constructor(private rest:RestService, private globalVar:GlobalVarService) { }

  ngOnInit(): void {
  }

  search(a:any){
    let data = {
      search: a.value,
      type: 0,
      username: this.globalVar.actualUser.username
    }
    console.log(a.value)
    this.rest.post('/search', data).subscribe({
      next: res=>{
        console.log(res)
      },
      error: err=>{
        console.log(err)
      }
    })
  }

}
