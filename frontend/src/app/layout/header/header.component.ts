import {Component, OnInit, ViewEncapsulation, AfterViewInit, EventEmitter} from '@angular/core';
import {MaterializeDirective, MaterializeAction} from 'angular2-materialize';

import {GoogleSignInSuccess} from 'angular-google-signin';

declare const gapi: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class HeaderComponent implements OnInit, AfterViewInit {
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
    console.log(provider);
    // const auth2 = gapi.auth2.init({
    //   client_id: this.googleClientId,
    //   cookiepolicy: 'single_host_origin',
    // });

    // attach
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

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log('init');
  }

}
