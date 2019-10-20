import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDetailComponent } from './list-detail.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { ListFacade } from '../list/list.facade';

describe('ListDetailComponent', () => {
  let component: ListDetailComponent;
  let fixture: ComponentFixture<ListDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListDetailComponent],
      imports: [GridModule],
      providers: [{ provide: ListFacade, useValue: {} }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDetailComponent);
    component = fixture.componentInstance;
    component.detail = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
