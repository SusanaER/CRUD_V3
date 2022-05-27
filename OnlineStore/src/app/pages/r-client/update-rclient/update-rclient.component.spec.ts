import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRClientComponent } from './update-rclient.component';

describe('UpdateRClientComponent', () => {
  let component: UpdateRClientComponent;
  let fixture: ComponentFixture<UpdateRClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
