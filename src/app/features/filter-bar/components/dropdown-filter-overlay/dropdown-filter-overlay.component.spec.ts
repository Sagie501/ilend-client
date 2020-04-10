import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownFilterOverlayComponent } from './dropdown-filter-overlay.component';

describe('DropdownFilterOverlayComponent', () => {
  let component: DropdownFilterOverlayComponent;
  let fixture: ComponentFixture<DropdownFilterOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownFilterOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownFilterOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
