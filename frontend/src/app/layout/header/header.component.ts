import {Component, OnInit, AfterViewInit, ViewEncapsulation, Input, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';

import {MaterializeAction} from 'angular2-materialize';
import {GoogleSignInSuccess} from 'angular-google-signin';
import { FacebookService, LoginResponse, LoginOptions } from 'ngx-facebook';

import { User } from '../../user/user';
import {environment} from '../../../environments/environment';

import { UserService } from '../../user/user.service';
import {StorageService} from '../../storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class HeaderComponent implements OnInit {
  user: User;
  is_authenticated: boolean;
  title = 'GoodGames';
  private googleClientId = environment.google_client_id;
  private facebookClientId = environment.facebook_client_id;

  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor(private router: Router,
              private authService: UserService,
              private storageService: StorageService,
              private fb: FacebookService) {
    this.user = null;
    this.is_authenticated = false;

    fb.init({
      appId: this.facebookClientId,
      version: 'v2.9'
    });

  }

  /**
   * Modals...causing more problems
   */
  openModal() {
    this.modalActions.emit({
      action: 'modal',
      params: ['open']
    });
  }

  /**
   * Modals...causing more problems
   */
  closeModal() {
    this.modalActions.emit({
      action: 'modal',
      params: ['close']
    });
  }

  /**
   * Google Sign On
   * @param {GoogleSignInSuccess} event
   */
  onGoogleSignInSuccess(event: GoogleSignInSuccess) {
    const googleUser: gapi.auth2.GoogleUser = event.googleUser;
    const id: string = googleUser.getId();
    const profile: gapi.auth2.BasicProfile = googleUser.getBasicProfile();
    const user = new User(id, profile.getName(), profile.getEmail(), profile.getImageUrl());
    this.storageService.storeData('userKey', user);
    this.login();
    // Redirect to dashboard
    // this.router.navigate(['/dashboard']);
}

  /**
   * Login
   */
  login() {
    // this.closeModal();
    this.is_authenticated = this.storageService.isAuthenticated();
    this.user = this.storageService.getData('userKey');
    this.authService.login();
  }

  /**
   * Sign Out
   * @todo: Bug in Signout; Template doesn't refresh unless button is selected twice
   */
  signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    });
    this.storageService.deleteData('userKey');

    // this.fb.logout()
    //   .then((res: LoginResponse) => {
    //     console.log('Logged out', res);
    //   })
    //   .catch(this.handleError);

    this.router.navigate(['/']);
  }

  /**
   * Login with additional permissions/options
   */
  loginWithOptions() {

    const loginOptions: LoginOptions = {
      enable_profile_selector: true,
      return_scopes: true,
      scope: 'public_profile,user_friends,email'
    };

    this.fb.login(loginOptions)
      .then((res: LoginResponse) => {
        console.log('Logged in', res);
      })
      .catch(this.handleError);

  }

  getLoginStatus() {
    this.fb.getLoginStatus()
      .then(console.log.bind(console))
      .catch(console.error.bind(console));
  }

  /**
   * Get the user's profile
   */
  getProfile() {
    this.fb.api('/me?fields=id,name,email')
      .then((res: any) => {
        console.log('Got the users profile', res);

        // res.email, res.name
      })
      .catch(this.handleError);
  }

  /**
   * Get the users friends
   */
  getFriends() {
    this.fb.api('/me/friends')
      .then((res: any) => {
        console.log('Got the users friends', res);
      })
      .catch(this.handleError);
  }

  private handleError(error) {
    console.error('Error processing action', error);
  }

  ngOnInit() {
    this.is_authenticated = this.storageService.isAuthenticated();
    this.user = this.storageService.getData('userKey');
  }

}
