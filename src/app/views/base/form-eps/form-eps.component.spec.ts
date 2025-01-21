import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEpsComponent } from './form-eps.component';

describe('FormEpsComponent', () => {
  let component: FormEpsComponent;
  let fixture: ComponentFixture<FormEpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEpsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
