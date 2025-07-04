import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecitationInfoComponent } from './recitation-info.component';

describe('RecitationInfoComponent', () => {
  let component: RecitationInfoComponent;
  let fixture: ComponentFixture<RecitationInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecitationInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecitationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
