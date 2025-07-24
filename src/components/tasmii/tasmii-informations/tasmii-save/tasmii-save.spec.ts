import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasmiiSave } from './tasmii-save';

describe('TasmiiSave', () => {
  let component: TasmiiSave;
  let fixture: ComponentFixture<TasmiiSave>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasmiiSave]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasmiiSave);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
