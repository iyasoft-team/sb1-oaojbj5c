import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecitationList } from './recitation-list';

describe('RecitationList', () => {
  let component: RecitationList;
  let fixture: ComponentFixture<RecitationList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecitationList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecitationList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
