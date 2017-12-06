import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTopComponent } from './game-top.component';

describe('GameTopComponent', () => {
  let component: GameTopComponent;
  let fixture: ComponentFixture<GameTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
