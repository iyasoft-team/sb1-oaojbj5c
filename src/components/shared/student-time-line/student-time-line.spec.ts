import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTimeLine } from './student-time-line';

describe('StudentTimeLine', () => {
  let component: StudentTimeLine;
  let fixture: ComponentFixture<StudentTimeLine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentTimeLine]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentTimeLine);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
