import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {

  public currentUrl : string;
  public isCollapsed;
  public params     : {};

  constructor(private activateRoute: ActivatedRoute) {

  }

  ngOnInit() {

    this.activateRoute.url
      .subscribe( url => {
        this.currentUrl = url[0].path;

      });
    this.activateRoute.params.subscribe( param => {
      this.params = param;
    } );
  }

  public hasParams(): boolean {
    return Object.keys(this.params).length > 0;
  }
}
