import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormcardsComponent } from './formcards.component';

describe('FormcardsComponent', () => {
  let component: FormcardsComponent;
  let fixture: ComponentFixture<FormcardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormcardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
