import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasmiiHomework } from './tasmii-homework';

describe('TasmiiHomework', () => {
  let component: TasmiiHomework;
  let fixture: ComponentFixture<TasmiiHomework>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasmiiHomework]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasmiiHomework);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
