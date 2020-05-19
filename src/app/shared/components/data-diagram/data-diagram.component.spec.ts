import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDiagramComponent } from './data-diagram.component';

describe('DataDiagramComponent', () => {
  let component: DataDiagramComponent;
  let fixture: ComponentFixture<DataDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataDiagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
