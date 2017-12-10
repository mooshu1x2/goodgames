import { Component, OnInit, ViewEncapsulation, Output} from '@angular/core';

import {User} from '../user/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  public user: User;

  constructor() { }

  ngOnInit() {
    // read from storage
    this.user = JSON.parse(localStorage.getItem('userKey'));
  }

}
