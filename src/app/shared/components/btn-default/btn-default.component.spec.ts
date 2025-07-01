import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnDefaultComponent } from './btn-default.component';

describe('BtnDefaultComponent', () => {
  let component: BtnDefaultComponent;
  let fixture: ComponentFixture<BtnDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnDefaultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
