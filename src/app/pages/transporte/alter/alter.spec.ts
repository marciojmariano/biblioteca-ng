import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Alter } from './alter';

describe('Alter', () => {
  let component: Alter;
  let fixture: ComponentFixture<Alter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Alter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Alter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
