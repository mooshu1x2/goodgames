import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchBarComponent implements OnInit {
  api_url = environment.api_url + '/games/choices/';
  data: any = {};
  searchTerm: string;

  constructor(private http: HttpClient, private router: Router) {
  }

  getData() {
    return this.http.get(this.api_url);
  }

  getChoices() {
    this.getData().subscribe(data => {
      this.data = data;
    });
  }

  onSubmit() {
    this.router.navigate(['/search', this.searchTerm]);
  }

  ngOnInit() {
    this.getChoices();
    this.getData();
  }

}
