import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KontrahentFormComponent } from './user-form.component';

describe('KontrahentFormComponent', () => {
  let component: KontrahentFormComponent;
  let fixture: ComponentFixture<KontrahentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KontrahentFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KontrahentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
