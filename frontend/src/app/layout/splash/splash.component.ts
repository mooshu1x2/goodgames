import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SplashComponent implements OnInit {
  title = 'GoodGames';
  constructor() { }

  ngOnInit() {
  }

}
