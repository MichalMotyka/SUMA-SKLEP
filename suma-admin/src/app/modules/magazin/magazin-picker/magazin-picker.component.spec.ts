import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagazinPickerComponent } from './magazin-picker.component';

describe('MagazinPickerComponent', () => {
  let component: MagazinPickerComponent;
  let fixture: ComponentFixture<MagazinPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagazinPickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MagazinPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
