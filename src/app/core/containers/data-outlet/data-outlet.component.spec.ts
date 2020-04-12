import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataOutletComponent } from './data-outlet.component';

describe('DataOutletComponent', () => {
  let component: DataOutletComponent;
  let fixture: ComponentFixture<DataOutletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataOutletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
