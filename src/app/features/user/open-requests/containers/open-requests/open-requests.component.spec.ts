import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenRequestsComponent } from './open-requests.component';

describe('OpenRequestsComponent', () => {
  let component: OpenRequestsComponent;
  let fixture: ComponentFixture<OpenRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
