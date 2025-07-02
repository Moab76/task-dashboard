import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenEditComponent } from './screen-edit.component';

describe('ScreenEditComponent', () => {
  let component: ScreenEditComponent;
  let fixture: ComponentFixture<ScreenEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreenEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
