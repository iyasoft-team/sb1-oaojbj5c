import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasmiiHeader } from './tasmii-header';

describe('TasmiiHeader', () => {
  let component: TasmiiHeader;
  let fixture: ComponentFixture<TasmiiHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasmiiHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasmiiHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
