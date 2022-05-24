import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RClientComponent } from './r-client.component';

describe('RClientComponent', () => {
  let component: RClientComponent;
  let fixture: ComponentFixture<RClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
