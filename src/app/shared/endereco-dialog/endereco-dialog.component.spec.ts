import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnderecoDialogComponent } from './endereco-dialog.component';

describe('EnderecoDialogComponent', () => {
  let component: EnderecoDialogComponent;
  let fixture: ComponentFixture<EnderecoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnderecoDialogComponent]
    });
    fixture = TestBed.createComponent(EnderecoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
