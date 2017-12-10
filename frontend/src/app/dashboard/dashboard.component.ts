import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import {StorageService} from '../storage.service';
import {GameService} from '../games/shared/game.service';
import {Game} from '../games/shared/game';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  games: Game[];

  constructor(private router: Router,
              private storageService: StorageService,
              private gameService: GameService) { }

  ngOnInit() {
    this.getCurrentlyPlaying();
  }

  getCurrentlyPlaying() {
    this.gameService.getCurrentlyPlayingGames()
      .subscribe( data => this.games = data);
  }
}
