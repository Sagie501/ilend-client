import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteCategoriesDialogComponent } from './favorite-categories-dialog.component';

describe('FavoriteCategoriesDialogComponent', () => {
  let component: FavoriteCategoriesDialogComponent;
  let fixture: ComponentFixture<FavoriteCategoriesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteCategoriesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteCategoriesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
