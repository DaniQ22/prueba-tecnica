/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PenelComponent } from './penel.component';

describe('PenelComponent', () => {
  let component: PenelComponent;
  let fixture: ComponentFixture<PenelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
