import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SopModalComponent } from './sop-modal.component';

describe('SopModalComponent', () => {
  let component: SopModalComponent;
  let fixture: ComponentFixture<SopModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SopModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SopModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
