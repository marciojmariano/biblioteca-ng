import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporteList } from './list';

describe('List', () => {
  let component: TransporteList;
  let fixture: ComponentFixture<TransporteList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransporteList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransporteList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
