import { TestBed } from '@angular/core/testing';
import { ImngTypeaheadDirective } from './type-ahead.directive';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import {
  ChangeDetectorRef,
  ElementRef,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { NgControl } from '@angular/forms';

describe('ImngTypeaheadDirective', () => {
  const provideMock = jest.fn(() => ({
    ngOnDestroy: jest.fn(),
    dispose: jest.fn(),
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ImngTypeaheadDirective,
        {
          provide: ComponentLoaderFactory,
          useValue: { createLoader: jest.fn(() => ({ provide: provideMock })) },
        },
        { provide: ChangeDetectorRef, useValue: {} },
        { provide: ElementRef, useValue: {} },
        { provide: NgControl, useValue: {} },
        { provide: Renderer2, useValue: {} },
        { provide: ViewContainerRef, useValue: {} },
      ],
    }).compileComponents();
  });
  it('should create an instance', () => {
    const directive = TestBed.inject(ImngTypeaheadDirective);
    expect(directive).toBeTruthy();
    expect(provideMock).toHaveBeenCalledTimes(1);
  });
});
