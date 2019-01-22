import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DictDetailComponent } from './dict-detail.component';

describe('DictDetailComponent', () => {
  let component: DictDetailComponent;
  let fixture: ComponentFixture<DictDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DictDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
