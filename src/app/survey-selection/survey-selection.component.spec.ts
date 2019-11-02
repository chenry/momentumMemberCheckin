import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveySelectionComponent } from './survey-selection.component';

describe('SurveySelectionComponent', () => {
  let component: SurveySelectionComponent;
  let fixture: ComponentFixture<SurveySelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveySelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveySelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
