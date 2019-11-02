import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberCheckinCalculatorComponent } from './member-checkin-calculator.component';

describe('MemberCheckinCalculatorComponent', () => {
  let component: MemberCheckinCalculatorComponent;
  let fixture: ComponentFixture<MemberCheckinCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberCheckinCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberCheckinCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
