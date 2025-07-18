import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSessionDayModal } from './edit-session-day-modal';

describe('EditSessionDayModal', () => {
  let component: EditSessionDayModal;
  let fixture: ComponentFixture<EditSessionDayModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSessionDayModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSessionDayModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
