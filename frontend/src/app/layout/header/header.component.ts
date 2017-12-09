import {Component, OnInit, ViewEncapsulation, AfterViewInit, Output, EventEmitter} from '@angular/core';

import {MaterializeAction} from 'angular2-materialize';
import {GoogleSignInSuccess} from 'angular-google-signin';

import { User} from '../../user/user';

declare const gapi: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class HeaderComponent implements OnInit, AfterViewInit {
  @Output() user: User;
  title = 'GoodGames';
  modalActions = new EventEmitter<string|MaterializeAction>();

  private googleClientId = '319120036661-fm549dr67ad0du26i9t72s7s9fcj6moo.apps.googleusercontent.com';

  constructor() { }

  openModal() {
    this.modalActions.emit({
      action: 'modal',
      params: ['open']
    });
  }

  closeModal() {
    // const auth2 = gapi.auth2.getAuthInstance();
    // auth2.signOut().then(function () {
    //   console.log('Signed out');
    // });

    this.modalActions.emit({
      action: 'modal',
      params: ['close']
    });
  }

  login(provider: string) {
  }

  onGoogleSignInSuccess(event: GoogleSignInSuccess) {
    const googleUser: gapi.auth2.GoogleUser = event.googleUser;
    const id: string = googleUser.getId();
    const profile: gapi.auth2.BasicProfile = googleUser.getBasicProfile();
    console.log('ID: ' +
      profile
        .getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Email: ' + profile.getEmail());
    console.log('ID Token: ' + googleUser.getAuthResponse().id_token);
    console.log('Access Token: ' + googleUser.getAuthResponse().access_token);

    profile.getFirstName();
    const authenticated_user = new User();
    authenticated_user.id = profile.getEmail();
    authenticated_user.first_name = profile.getName();
    console.log(authenticated_user);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log('init');
  }

}
