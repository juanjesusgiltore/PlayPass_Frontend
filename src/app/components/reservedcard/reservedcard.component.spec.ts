import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservedcardComponent } from './reservedcard.component';

describe('ReservedcardComponent', () => {
  let component: ReservedcardComponent;
  let fixture: ComponentFixture<ReservedcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservedcardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservedcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
