import { HttpClient } from '@angular/common/http';
import { NrsrxBaseApiClientService } from './nrsrx-api-client';
import { waitForAsync, TestBed } from '@angular/core/testing';

describe('NrsrxBaseApiClientService', () => {
  let httpClient: HttpClient;
  let mockApiService: MockApiService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: {
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn(),
          } as Partial<HttpClient>,
        },
        MockApiService,
      ],
    }).compileComponents();
    httpClient = TestBed.inject(HttpClient);
    mockApiService = TestBed.inject(MockApiService);
  }));

  it('should post correctly with id', () => {
    mockApiService.dateOnlyPropertyNames = ['birthDate'];
    const postData = { id: '🐱‍👤🐱‍👤🐱‍👤' };
    mockApiService.post(postData);
    expect(httpClient.post).toHaveBeenCalledWith(
      `good_times?id=${postData.id}`,
      postData,
    );
  });
  it('should post correctly with date only prop', () => {
    mockApiService.dateOnlyPropertyNames = ['birthDate'];
    const postData = {
      id: '🐱‍👤🐱‍👤🐱‍👤',
      birthDate: new Date('1776-07-04'),
    };
    mockApiService.post(postData);
    expect(httpClient.post).toHaveBeenCalledWith(
      `good_times?id=${postData.id}`,
      {
        ...postData,
        birthDate: '1776-07-04',
      },
    );
  });
  it('post should handle invalid id', () => {
    const postData = { id: null as unknown as string };
    mockApiService.post(postData);
    expect(httpClient.post).toHaveBeenCalledWith(`good_times`, postData);
  });
  it('should put correctly with id', () => {
    mockApiService.dateOnlyPropertyNames = ['birthDate'];
    const postData = { id: '🐱‍👤🐱‍👤🐱‍👤' };
    mockApiService.put(postData);
    expect(httpClient.put).toHaveBeenCalledWith(
      `good_times?id=${postData.id}`,
      postData,
    );
  });
  it('should delete correctly with id', () => {
    const postData = { id: '🐱‍👤🐱‍👤🐱‍👤' };
    mockApiService.delete(postData);
    expect(httpClient.delete).toHaveBeenCalledWith(
      `good_times?id=${postData.id}`,
    );
  });

  class MockApiService extends NrsrxBaseApiClientService<{ id: string }> {
    public override url = 'good_times';
  }
});
