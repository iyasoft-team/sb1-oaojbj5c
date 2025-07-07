import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentInfoBar } from './student-info-bar';

describe('StudentInfoBar', () => {
  let component: StudentInfoBar;
  let fixture: ComponentFixture<StudentInfoBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentInfoBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentInfoBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
