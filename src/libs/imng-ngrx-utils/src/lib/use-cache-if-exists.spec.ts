import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import * as actionTypes from './cache-test-module/actions';
import { feature } from './cache-test-module/feature';
import { Effects } from './cache-test-module/effect';
import { of } from 'rxjs';
import { readFirst } from 'imng-ngrx-utils/testing';

describe('UseCacheIfExists', () => {
  let store: Store;
  let httpClient: HttpClient;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature(feature),
        EffectsModule.forFeature([Effects]),
      ],
      providers: [
        {
          provide: HttpClient,
          useValue: {
            get: jest.fn(() => of([{ id: 1, name: 'Test Record' }])),
          },
        },
      ],
    })
    class FeatureModule {}

    @NgModule({
      imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        FeatureModule,
      ],
    })
    class RootModule {}
    TestBed.configureTestingModule({ imports: [RootModule] });

    store = TestBed.inject(Store);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should use if cache records exists', async () => {
    store.dispatch(
      actionTypes.loadRecordsSuccess([{ id: 1, name: 'Test Record' }]),
    );
    store.dispatch(actionTypes.loadRecordsRequest());
    expect(httpClient.get).not.toHaveBeenCalled();
    expect(
      await readFirst(store.select(feature.selectRecords)),
    ).toMatchSnapshot();
  });

  it('should use httpClient if cache is empty', async () => {
    store.dispatch(actionTypes.loadRecordsSuccess([]));
    store.dispatch(actionTypes.loadRecordsRequest());
    expect(httpClient.get).toHaveBeenCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith('/api/cache-test');
    expect(
      await readFirst(store.select(feature.selectRecords)),
    ).toMatchSnapshot();
  });

  it('should use httpClient if cache is undefined', async () => {
    store.dispatch(actionTypes.loadRecordsRequest());
    expect(httpClient.get).toHaveBeenCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith('/api/cache-test');
    expect(
      await readFirst(store.select(feature.selectRecords)),
    ).toMatchSnapshot();
  });
});
