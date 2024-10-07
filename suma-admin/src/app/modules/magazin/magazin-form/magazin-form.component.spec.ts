import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagazinFormComponent } from './magazin-form.component';

describe('MagazinFormComponent', () => {
  let component: MagazinFormComponent;
  let fixture: ComponentFixture<MagazinFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagazinFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MagazinFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
