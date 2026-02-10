import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingListComponent } from './training-list.component';

describe('TrainingListComponent', () => {
  let component: TrainingListComponent;
  let fixture: ComponentFixture<TrainingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
