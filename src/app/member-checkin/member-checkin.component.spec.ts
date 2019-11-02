import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberCheckinComponent } from './member-checkin.component';

describe('MemberCheckinComponent', () => {
  let component: MemberCheckinComponent;
  let fixture: ComponentFixture<MemberCheckinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberCheckinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberCheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
