import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AyahEvalComponent } from './ayah-eval.component';

describe('AyahEvalComponent', () => {
  let component: AyahEvalComponent;
  let fixture: ComponentFixture<AyahEvalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AyahEvalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AyahEvalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
