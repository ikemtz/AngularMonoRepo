import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridComponent } from '@progress/kendo-angular-grid';
import { of } from 'rxjs';
import { ImngGridHeaderComponent } from './grid-header.component';

describe('ImngGridHeaderComponent', () => {
  let component: ImngGridHeaderComponent;
  let fixture: ComponentFixture<ImngGridHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImngGridHeaderComponent],
      providers: [{
        provide: GridComponent,
        useValue: {}
      }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImngGridHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should support hiddenColumns = true', () => {
    component.hasHiddenColumns$ = of(true);
    fixture.detectChanges();
    const element = fixture.nativeElement;
    expect(element.innerHTML).toContain('class="text-primary"');
  });

  it('should support hiddenColumns = false', () => {
    component.hasHiddenColumns$ = of(false);
    fixture.detectChanges();
    const element = fixture.nativeElement;
    expect(element.innerHTML).toContain('title="Columns" ng-reflect-ng-class="[object Object]"');
  });

  it('should support hideReloadData = true', () => {
    component.hideReloadData = true;
    fixture.detectChanges();
    const element = fixture.nativeElement;
    expect(element.innerHTML).toMatchSnapshot();
  });

  it('should support hideReloadData = false', () => {
    component.hideReloadData = false;
    fixture.detectChanges();
    const element = fixture.nativeElement;
    expect(element.innerHTML).toMatchSnapshot();
  });

  it('should support hideClearFilters = true', () => {
    component.hideClearFilters = true;
    fixture.detectChanges();
    const element = fixture.nativeElement;
    expect(element.innerHTML).toMatchSnapshot();
  });

  it('should support hideClearFilters = false', () => {
    component.hideClearFilters = false;
    fixture.detectChanges();
    const element = fixture.nativeElement;
    expect(element.innerHTML).toMatchSnapshot();
  });
});
