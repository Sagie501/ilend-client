import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNameCircleComponent } from './user-name-circle.component';

describe('UserNameCircleComponent', () => {
  let component: UserNameCircleComponent;
  let fixture: ComponentFixture<UserNameCircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserNameCircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNameCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
