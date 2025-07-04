import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralEvalComponent } from './general-eval.component';

describe('GeneralEvalComponent', () => {
  let component: GeneralEvalComponent;
  let fixture: ComponentFixture<GeneralEvalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralEvalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralEvalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
