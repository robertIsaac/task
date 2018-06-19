import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertInputComponent } from './insert-input.component';

describe('InsertInputComponent', () => {
  let component: InsertInputComponent;
  let fixture: ComponentFixture<InsertInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
