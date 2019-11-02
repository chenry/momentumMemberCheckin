import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberCheckinPicturesComponent } from './member-checkin-pictures.component';

describe('MemberCheckinPicturesComponent', () => {
  let component: MemberCheckinPicturesComponent;
  let fixture: ComponentFixture<MemberCheckinPicturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberCheckinPicturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberCheckinPicturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
