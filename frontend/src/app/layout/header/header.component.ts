import {Component, OnInit, ViewEncapsulation, AfterViewInit, EventEmitter} from '@angular/core';
import {MaterializeDirective, MaterializeAction} from "angular2-materialize";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class HeaderComponent implements OnInit, AfterViewInit {
  title = 'GoodGames';
  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor() { }

  openModal() {
    this.modalActions.emit({
      action: 'modal',
      params: ['open']
    });
  }

  closeModal() {
    this.modalActions.emit({
      action: 'modal',
      params: ['close']
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log('init');

  }

}
