import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenConfirmComponent } from './screen-confirm.component';

describe('ScreenConfirmComponent', () => {
  let component: ScreenConfirmComponent;
  let fixture: ComponentFixture<ScreenConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenConfirmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreenConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
