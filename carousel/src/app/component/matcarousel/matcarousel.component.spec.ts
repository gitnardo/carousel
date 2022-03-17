import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatcarouselComponent } from './matcarousel.component';

describe('MatcarouselComponent', () => {
  let component: MatcarouselComponent;
  let fixture: ComponentFixture<MatcarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatcarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatcarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
