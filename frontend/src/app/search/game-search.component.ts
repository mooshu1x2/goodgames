import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {GameService} from '../games/shared/game.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './game-search.component.html',
  styleUrls: ['./game-search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GameSearchComponent implements OnInit {
  searchTerm: string;

  constructor(private router: Router) {
  }

  onSubmit() {
    this.router.navigate(['/search', this.searchTerm]);
  }

  ngOnInit() {
  }
}
